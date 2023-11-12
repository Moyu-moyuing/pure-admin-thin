<script setup lang="ts">
import Print from "@/utils/print";
import { ref, reactive, onMounted, toRaw } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { message } from "@/utils/message";
// import { tableData } from "../data/data";
import { LoadingConfig, PaginationProps } from "@pureadmin/table";
// import { delay } from "@pureadmin/utils";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getEventsList } from "@/api/events";
import Printer from "@iconify-icons/ep/printer";
import Excel from "@iconify-icons/ri/file-excel-2-line";
import ViewJSON from "@iconify-icons/ant-design/file-search-outlined";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh-right";

// @ts-ignore
import { utils, writeFile } from "xlsx";

defineOptions({
  name: "EventTable"
});

class SearchError extends Error {}

const loading = ref<boolean>(true);
const dataList = ref([]);
const tableRef = ref(null);
// const tableBarRef = ref(null);
const submitForm = ref(null);
const formRef = ref(null);
const columns: TableColumnList = [
  { type: "expand", slot: "expand", fixed: true },
  { type: "index", label: "序号", minWidth: 30 },
  {
    label: "日期",
    prop: "date"
  },
  {
    label: "文本句",
    prop: "text",
    minWidth: 200
  },
  {
    label: "事件",
    children: [
      { label: "事件类型", prop: "events.event_type" },
      { label: "触发词", prop: "events.trigger.keywords" },
      { label: "触发词位置", prop: "events.trigger.position" }
    ]
  },
  {
    label: "操作",
    width: 120,
    fixed: "right",
    slot: "operation"
  }
];

const childColumns: TableColumnList = [
  { label: "事件实体", prop: "entity" },
  { label: "事件位置", prop: "position" },
  { label: "事件角色", prop: "role" }
];

const pagination = reactive<PaginationProps>({
  pageSize: 10,
  currentPage: 1,
  pageSizes: [5, 10, 15, 20, 30, 50],
  total: 0,
  align: "right",
  background: true,
  small: false
});

const loadingConfig = reactive<LoadingConfig>({
  text: "加载中...",
  viewBox: "-10, -10, 50, 50",
  spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
});
const eventForm = reactive({
  sentId: "",
  keyword: ""
});

const onCurrentChange = async (currentPage: number) => {
  loadingConfig.text = `正在加载第${currentPage}页数据...}`;
  await handleSearch(false, currentPage);
};
const onSizeChange = async () => {
  submitForm.value.pageSize = pagination.pageSize;
  await handleSearch(false, 1);
};

const handleClick = (row: any) => {
  message(
    `您正在查看第 ${pagination.currentPage}页的第 ${row.id + 1} 行的数据.
    数据内容为：${JSON.stringify(row)} `,
    {
      type: "success"
    }
  );
};

const submitEventForm = pageNumber => {
  return new Object({
    ...toRaw(eventForm),
    pageSize: pagination.pageSize,
    pageNo: pageNumber
  });
};

const handleSearch = async (isInit, currentPage) => {
  if (isInit) {
    submitForm.value = submitEventForm(1);
    await onSearch();
  } else {
    submitForm.value.pageNo = currentPage;
    await onSearch();
  }
};

const onSearch: () => Promise<void> = async () => {
  loading.value = true;
  await getEventsList(submitForm.value)
    .then(result => {
      if (result.code === 200 && result.success) {
        dataList.value = result.data.list;
        pagination.total = result.data.total;
        pagination.pageSize = result.data.pageSize;
        pagination.currentPage = result.data.currentPage;
      } else if (result.code === 404 && !result.success) {
        dataList.value = result.data.list;
        pagination.total = result.data.total;
        pagination.pageSize = result.data.pageSize;
        pagination.currentPage = result.data.currentPage;
        throw new SearchError("无查询结果");
      } else {
        throw new SearchError("查询失败");
      }
    })
    .then(() => {
      message("查询成功", { type: "success" });
    })
    .catch(err => {
      if (err instanceof SearchError) message(err.message, { type: "warning" });
      else message(err.message, { type: "error" });
    })
    .finally(() => {
      loading.value = false;
    });
};
const resetForm = async (formRef: any) => {
  if (!formRef) return;
  formRef.resetFields();
  //如果是重置或者搜索全部默认置1，只有点击分页器时才加上分页查询限制
  await handleSearch(true, 1);
};

const print = () => {
  Print(tableRef.value.getTableDoms().tableWrapper).toPrint;
};

const exportExcel = () => {
  const result = dataList.value.map(item => {
    const arr = [];
    columns.forEach(column => {
      if (column.children) {
        column.children.forEach(child => {
          arr.push(eval("item." + child.prop));
        });
      } else {
        if (column.type === "expand" || column.label === "操作") return;
        else if (column.type === "index") arr.push(item.id);
        else arr.push(item[column.prop as string]);
      }
    });
    arr.push(
      item.events.arguments
        ?.map(arg => arg.entity + "," + arg.position + "," + arg.role)
        .join(";")
    );
    arr.push(item.sent_id);
    return arr;
  });
  const titleList = [];
  columns.forEach(column => {
    if (column.children) {
      column.children.forEach(child => {
        titleList.push(child.label);
      });
    } else {
      if (column.type === "expand" || column.label === "操作") return;
      else if (column.type === "index") titleList.push("序号");
      else titleList.push(column.label);
    }
  });
  titleList.push("参数列表");
  titleList.push("句子索引");
  result.unshift(titleList);
  const workSheet = utils.aoa_to_sheet(result);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, "事件数据报表");
  writeFile(workBook, "事件数据报表.xlsx");
  message("导出成功", { type: "success" });
};

onMounted(() => {
  handleSearch(true, 1);
});
</script>
<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="eventForm"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="句子索引：" prop="sentId">
        <el-input
          v-model="eventForm.sentId"
          placeholder="请输入唯一索引"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="触发词：" prop="keyword">
        <el-input
          v-model="eventForm.keyword"
          placeholder="请输入触发词"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="handleSearch(true, 1)"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar
      title="事件抽取图表"
      :columns="columns"
      :table-ref="tableRef?.getTableRef()"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button :icon="useRenderIcon(Printer)" type="primary" @click="print">
          打印
        </el-button>
        <el-button
          :icon="useRenderIcon(Excel)"
          type="primary"
          @click="exportExcel"
        >
          导出
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          ref="tableRef"
          row-key="id"
          alignWhole="center"
          height="400"
          showOverflowTooltip
          :loading="loading"
          :size="size"
          :loadingConfig="loadingConfig"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          @page-current-change="onCurrentChange"
          @page-size-change="onSizeChange"
        >
          <template #operation="{ row }">
            <el-button
              link
              class="reset-margin"
              type="primary"
              :size="size"
              :icon="useRenderIcon(ViewJSON)"
              @click="handleClick(row)"
              >查看</el-button
            >
          </template>

          <template #expand="{ row }">
            <div class="m-4">
              <p class="mb-4">句子索引: {{ row.sent_id }}</p>
              <p class="mb-4">文本句: {{ row.text }}</p>
              <h3>参数列表</h3>
              <pure-table
                :data="row.events.arguments"
                :columns="childColumns"
                :border="true"
                alignWhole="center"
              />
            </div>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

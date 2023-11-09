<script setup lang="ts">
import Print from "@/utils/print";
import { ref, reactive, onMounted } from "vue";
import { message } from "@/utils/message";
import { tableData } from "../data/data";
import { LoadingConfig, PaginationProps } from "@pureadmin/table";
import { delay, clone } from "@pureadmin/utils";
// @ts-ignore
import { utils, writeFile } from "xlsx";

defineOptions({
  name: "EventTable"
});
const loading = ref<boolean>(true);
const dataList = ref([]);
const printRef = ref(null);
const columns: TableColumnList = [
  { type: "expand", slot: "expand", fixed: true },
  { type: "index" },
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

const onCurrentChange = (currentPage: number) => {
  loadingConfig.text = `正在加载第${currentPage}页数据...}`;
  loading.value = true;
  delay(600).then(() => {
    loading.value = false;
  });
};

const handleClick = (row: any) => {
  message(
    `您正在查看第 ${pagination.currentPage}页的第 ${row.id} 行的数据.
    数据内容为：${JSON.stringify(row)} `,
    {
      type: "success"
    }
  );
};

const print = () => {
  Print(printRef.value.getTableDoms().tableWrapper).toPrint;
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
  delay(600).then(() => {
    dataList.value = clone(tableData);
    pagination.total = dataList.value.length;
    loading.value = false;
  });
});
</script>
<template>
  <div>
    <el-button type="primary" @click="print" class="mb-[20px] float-right">
      打印
    </el-button>
    <el-button
      type="primary"
      @click="exportExcel"
      class="mb-[20px] float-right mr-6"
    >
      导出
    </el-button>
    <pure-table
      border
      ref="printRef"
      row-key="id"
      alignWhole="center"
      showOverflowTooltip
      :loading="loading"
      :loadingConfig="loadingConfig"
      :data="
        dataList.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :columns="columns"
      :pagination="pagination"
      @page-current-change="onCurrentChange"
    >
      <template #operation="{ row }">
        <el-button size="small" @click="handleClick(row)">查看</el-button>
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
  </div>
</template>

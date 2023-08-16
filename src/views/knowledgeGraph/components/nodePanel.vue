<!-- 
 * @description: //TODO
 * @fileName: nodePanel.vue 
 * @author: Moyu-moyuing
 * @date: 2023-07-24 13:24:42
 -->
<script setup lang="ts">
// import { ref } from "vue";
import { useControlD3StoreHook } from "@/store/modules/controlD3";
// import { ButtonProps } from "element-plus";
import { randomColor } from "@pureadmin/utils";

defineOptions({
  name: "NodePanel"
});
const props = defineProps<{
  node: any;
  links: any;
  color: any;
  allLinks: any;
}>();
const emit = defineEmits<{
  (e: "tagSelect", value: string): void;
}>();
// const type: Array<ButtonProps["type"]> = [
//   "primary",
//   "success",
//   "danger",
//   "warning",
//   "info",
//   ""
// ];
// const tagType: (index: number) => ButtonProps["type"] = index => {
//   return type[index % 4];
// };
const tagSelect: (item: string) => void = item => {
  emit("tagSelect", item);
};
</script>

<template>
  <el-tabs
    :stretch="true"
    class="shadow-[0_4px_6px_-1px_rgb(128,128,128)] overflow-auto text-black dark:text-white bg-white dark:bg-black"
  >
    <el-tab-pane label="基本数据信息">
      <el-divider>节点信息</el-divider>
      <div class="h-48">
        <el-empty
          v-if="!useControlD3StoreHook().hasData"
          description="暂无数据"
          class="h-5/6"
        />
        <div
          v-if="useControlD3StoreHook().hasData"
          class="flex items-center mb-5"
        >
          <span class="inline-block w-24">名称：</span>
          <span class="inline-block w-24">{{ props.node.name }}</span>
        </div>
        <div
          v-if="useControlD3StoreHook().hasData"
          class="flex items-center mb-5"
        >
          <span class="inline-block w-24">类型：</span>
          <span class="inline-block w-24">{{ props.node.type }}</span>
        </div>
        <div
          v-if="useControlD3StoreHook().hasData"
          class="flex items-center mb-5"
        >
          <span class="inline-block w-24">颜色：</span>
          <span class="inline-block w-24">
            <el-icon
              style="margin: 0.1em 0.1em 0 0; border-radius: 2px"
              :size="20"
              :style="{ background: props.color }"
          /></span>
        </div>
      </div>
      <el-divider>关系标签</el-divider>
      <el-space wrap class="ml-3">
        <el-button
          v-for="(item, index) in props.allLinks"
          :key="index"
          round
          :color="//使用断言处理ts报错，解决联合类型不匹配问题
          randomColor({ type: 'hex' }) as string"
          @click="tagSelect(item)"
        >
          {{ item }}
        </el-button>
      </el-space>
    </el-tab-pane>
    <el-tab-pane label="关系信息">
      <el-empty
        v-if="!useControlD3StoreHook().hasData"
        description="暂无数据"
      />
      <div v-for="(item, index) in props.links" :key="index">
        <ul class="relationships">
          <li
            v-if="useControlD3StoreHook().hasData"
            class="flex items-center mb-5"
          >
            <span class="inline-block w-24">关系：</span>
            <span class="inline-block w-24">{{ item.relationship }}</span>
          </li>
          <li
            v-if="useControlD3StoreHook().hasData"
            class="flex items-center mb-5"
          >
            <span class="inline-block w-24">源节点：</span>
            <span class="inline-block w-24">{{ item.source }}</span>
          </li>
          <li
            v-if="useControlD3StoreHook().hasData"
            class="flex items-center mb-5"
          >
            <span class="inline-block w-24">目标节点：</span>
            <span class="inline-block w-24">{{ item.target }}</span>
          </li>
        </ul>

        <el-divider v-show="index === props.links.length - 1 ? false : true" />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="scss" scoped>
:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: 700;
}

.relationships {
  width: 100%;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px;
  }
}
</style>

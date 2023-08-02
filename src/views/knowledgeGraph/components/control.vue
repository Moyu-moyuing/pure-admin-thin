<!-- 
 * @description: //TODO
 * @fileName: control.vue 
 * @author: Moyu-moyuing
 * @date: 2023-07-24 02:22:08
 -->
<script setup lang="ts">
import { ref } from "vue";
// import { useControlD3StoreHook } from "@/store/modules/controlD3";
//引入图标
import ZoomIn from "@iconify-icons/ep/zoom-in";
import ZoomOut from "@iconify-icons/ep/zoom-out";
import Refresh from "@iconify-icons/ep/refresh";
import Search from "@iconify-icons/ep/search";
import Reset from "@iconify-icons/ant-design/fullscreen-exit-outlined";
defineOptions({
  name: "Control"
});
//焦点索引
const focusIndex = ref<Number>(-1);
//控件数据
const titleLists = ref([
  {
    name: "zoomIn",
    icon: ZoomOut,
    text: "缩小",
    size: "18",
    disabled: false
  },
  {
    name: "zoomOut",
    icon: ZoomIn,
    text: "放大",
    size: "18",
    disabled: false
  },
  {
    name: "refresh",
    icon: Reset,
    text: "自适应",
    size: "18",
    disabled: false
  },
  {
    name: "reset",
    icon: Refresh,
    text: "刷新",
    size: "18",
    disabled: false
  },
  {
    name: "search",
    icon: Search,
    text: "搜索关键字",
    size: "18",
    disabled: false
  }
]);
//鼠标事件控制提示
const onEnter: (key: number) => void = key => {
  focusIndex.value = key;
};
// //使用pinia传参
// const onControl: (name: string) => void = name => {
//   useControlD3StoreHook().updateControl(name);
// };
// //发送事件声明
const emit = defineEmits<{
  (e: "eventControl", name: string);
}>();

const onControl: (name: string) => void = name => {
  emit("eventControl", name);
};
//
</script>

<template>
  <!-- 由于elementui限制，只能在其接口处重写样式，无法使用taiwindCSS -->
  <!-- body-style接口无法更改box-shadow样式 -->
  <el-card
    shadow="never"
    class="shadow-[0_4px_6px_-1px_rgb(128,128,128)]"
    :body-style="{ padding: '0px' }"
  >
    <!-- 功能按钮 -->
    <ul>
      <li
        v-for="(item, key) in titleLists"
        :key="key"
        :title="item.text"
        class="dark:text-bg_color text-bg_color text-center m-3"
        @mouseenter.prevent="onEnter(key)"
        @mouseleave.prevent="focusIndex = -1"
      >
        <el-tooltip
          :content="item.text"
          :visible="focusIndex === key"
          placement="right"
        >
          <button
            :id="`${item.name}`"
            :disabled="item.disabled"
            :style="{
              cursor: item.disabled === false ? 'pointer' : 'not-allowed',
              color: item.disabled === false ? '' : '#00000040',
              background: 'transparent'
            }"
            @click="onControl(item.name)"
          >
            <span class="dark:text-white text-black hover:text-[#409eff]">
              <IconifyIconOffline
                :icon="item.icon"
                :style="{ fontSize: `${item.size}px` }"
              />
            </span>
          </button>
        </el-tooltip>
      </li>
    </ul>
  </el-card>
</template>

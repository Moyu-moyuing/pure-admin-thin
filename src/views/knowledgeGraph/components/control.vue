<script setup lang="ts">
import { ref } from "vue";
//引入图标
import ZoomIn from "@iconify-icons/ep/zoom-in";
import ZoomOut from "@iconify-icons/ep/zoom-out";
import Refresh from "@iconify-icons/ep/refresh";
import Search from "@iconify-icons/ep/search";
defineOptions({
  name: "Control"
});
//焦点索引
const focusIndex = ref<Number>(-1);
//控件数据

const titleLists = ref([
  {
    icon: ZoomOut,
    text: "缩小",
    size: "18",
    disabled: false
  },
  {
    icon: ZoomIn,
    text: "放大",
    size: "18",
    disabled: false
  },
  {
    icon: Refresh,
    text: "自适应",
    size: "18",
    disabled: false
  },
  {
    icon: Search,
    text: "搜索关键字",
    size: "18",
    disabled: false
  }
]);

//鼠标事件控制提示
const onEnter = key => {
  focusIndex.value = key;
};
const onControl = (item, key) => {
  console.log(item, key);
};
</script>

<template>
  <div>
    <el-card class="control-container" :body-style="{ padding: '0px' }">
      <!-- 功能按钮 -->
      <ul>
        <li
          v-for="(item, key) in titleLists"
          :key="key"
          :title="item.text"
          class="dark:text-bg_color"
          @mouseenter.prevent="onEnter(key)"
          @mouseleave.prevent="focusIndex = -1"
        >
          <el-tooltip
            :content="item.text"
            :visible="focusIndex === key"
            placement="right"
          >
            <button
              :disabled="item.disabled"
              :style="{
                cursor: item.disabled === false ? 'pointer' : 'not-allowed',
                color: item.disabled === false ? '' : '#00000040',
                background: 'transparent'
              }"
              @click="onControl(item, key)"
            >
              <span>
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
  </div>
</template>

<style scoped>
.control-container {
  background: hsl(0deg 0% 100% / 80%);
  box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
}

.control-container ul li {
  margin: 10px;
  text-align: center;
}

.control-container ul li span:hover {
  color: #409eff;
}
</style>

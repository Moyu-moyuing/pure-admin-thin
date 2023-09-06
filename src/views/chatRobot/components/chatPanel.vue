<script setup lang="ts">
import { ref } from "vue";
import SessionItem from "./sessionItem.vue";
defineOptions({
  name: "ChatPanel"
});
const sessions = [
  {
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0
  },
  {
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0
  },
  {
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0
  },
  {
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0
  },
  {
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0
  }
];
const activeId = ref(null);
const handleClickSession = sessionId => {
  activeId.value = sessionId;
};
const handleDeleteSession = session => {
  console.log(session);
};
</script>

<template>
  <el-card class="w-full flex">
    <!-- 聊天面板-->
    <div class="flex bg-[var(--el-bg-color)]">
      <!--会话列表-->
      <div
        class="bg-[rgb(32,33,35)] text-white dark:text-black w-[250px] rounded-tl-[20px] rounded-bl-[20px] relative border-r-[1px] border-solid border-[rgba(black,0.07)] p-2"
      >
        <div class="mt-[20px] text-[20px]">江湖百晓生</div>
        <div class="text-[10px] mt-[10px]">介绍信息...</div>
        <template v-for="(session, id) in sessions" :key="session">
          <SessionItem
            :active="id === activeId"
            :session="session"
            @click="handleClickSession(id)"
            @delete="handleDeleteSession(session)"
          />
        </template>
      </div>
      <!--消息面板-->
      <div class="w-[80vh] h-[800px]">messagepanel</div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  --el-card-border-radius: 20px;
}

:deep(.el-card__body) {
  padding: 0%;
}
</style>

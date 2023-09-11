<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChatSession } from "../type";
import SessionItem from "./sessionItem.vue";
import Plus from "@iconify-icons/ant-design/plus-outlined";
import TextLoading from "./textLoading.vue";
defineOptions({
  name: "ChatPanel"
});
const sessions = [
  {
    id: 0,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
    message: []
  },
  {
    id: 1,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 1,
    message: []
  },
  {
    id: 2,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 2,
    message: []
  },
  {
    id: 3,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 3,
    message: []
  },
  {
    id: 4,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 4,
    message: []
  }
];
// const activeId = ref(null);
// const isEdit = ref(false);
const activeSession = ref({ message: [] } as ChatSession);
const sessionList = ref([] as ChatSession[]);

// const handleClickSession = sessionId => {
//   activeId.value = sessionId;
// };

const initSession: () => void = () => {
  sessionList.value.push(...sessions);
  if (sessionList.value.length > 0) {
    activeSession.value = sessionList.value[0];
  }
};

const handleClickSession: (session: ChatSession) => void = session => {
  activeSession.value = session;
};
const handleDeleteSession: (session: ChatSession) => void = session => {
  const index = sessionList.value.findIndex(value => {
    return value.id === session.id;
  });
  sessionList.value.splice(index, 1);
};
const handleCreateSession = () => {
  const newSession = {
    id: sessionList.value.length + 1,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
    message: []
  };
  sessionList.value.unshift(newSession);
  activeSession.value = newSession;
};
const handleUpdateSessionTitle = (session, newTitle) => {
  session.title = newTitle;
};
onMounted(() => {
  initSession();
});
</script>

<template>
  <el-card class="w-full flex">
    <!-- 聊天面板-->
    <div class="flex bg-[var(--el-bg-color)]">
      <!--会话列表-->
      <div
        class="bg-[rgb(32,33,35)] text-white dark:text-black w-[300px] rounded-tl-[var(--el-card-border-radius)] rounded-bl-[var(--el-card-border-radius)] relative border-r-[1px] border-solid border-[rgba(black,0.07)] p-2"
      >
        <div class="mt-[20px] text-[20px]">江湖百晓生</div>
        <div class="text-[10px] mt-[10px]">介绍信息...</div>
        <div class="mt-5 mb-5 flex flex-row gap-2">
          <span
            class="flex px-3 min-h-[44px] py-1 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 h-11 flex-grow overflow-hidden"
            @click="handleCreateSession"
          >
            <IconifyIconOffline :icon="Plus" />
            <span>新建会话</span>
          </span>
        </div>
        <transition-group name="list-fade" tag="div">
          <SessionItem
            v-for="session in sessionList"
            :key="session.id"
            :active="session.id === activeSession.id"
            :session="session"
            @click="handleClickSession(session)"
            @delete="handleDeleteSession(session)"
            @updateTitle="handleUpdateSessionTitle"
          />
        </transition-group>
      </div>
      <!--消息面板-->
      <div class="w-full h-[800px]">
        <!--消息面板头-->
        <div class="pt-5 text-center">
          <div class="text-[rgba(black,0.7)] text-xl">
            {{ activeSession.title }}
          </div>
          <div class="text-[rgba(black,0.5)] mb-3">
            与江湖百晓生的{{ activeSession.sessionNum }}条对话
          </div>
        </div>
        <el-divider />
        <TextLoading />
        <!--会话内容-->
        <div />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  width: 100%;
  padding: 0%;
  //集成父类el-card的宽度，防止出现宽度不一样情况
}

.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.list-fade-enter,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-move {
  transition: transform 3s ease-in-out;
}
// 需要优化动画
</style>

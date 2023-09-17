<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { ChatSession, ChatMessage } from "../type";
import SessionItem from "./sessionItem.vue";
import Plus from "@iconify-icons/ant-design/plus-outlined";
import dayjs from "dayjs";
// import TextLoading from "./textLoading.vue";
import Message from "./message.vue";
import ChatInput from "./chatInput.vue";

import Refresh from "@iconify-icons/ep/refresh";
import Stop from "@iconify-icons/ri/stop-fill";

defineOptions({
  name: "ChatPanel"
});
const responseMessage = ref({} as ChatMessage);
const messagePanelRef = ref<HTMLElement | null>(null);
const sessions = [
  {
    id: 0,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
    message: [
      {
        content: "你好！",
        role: "user",
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
      } as ChatMessage,
      {
        content:
          "你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！",
        role: "assistant",
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
      } as ChatMessage
    ]
  },
  {
    id: 1,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
    message: []
  },
  {
    id: 2,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
    message: []
  },
  {
    id: 3,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
    message: []
  },
  {
    id: 4,
    title: "新的聊天",
    time: "2023-08-28",
    sessionNum: 0,
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
const handleSendMessage = message => {
  responseMessage.value = {
    role: "assistant",
    content: message,
    createTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
  } as ChatMessage;
  const userMessage = {
    session: Object.assign({}, activeSession.value),
    content: message,
    role: "user",
    createTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
  };
  //这里应该要把session.message消除，要不会造成循环依赖
  //应该要发送给后端数据
  userMessage.session.message = [];
  activeSession.value.message.push(...[userMessage, responseMessage.value]);
  activeSession.value.sessionNum += 2;
  isTyping.value = true;
  nextTick(scrollToBottom);
};

const respondValue = ref(false);
const isTyping = ref(false);
const responding = isResponding => {
  respondValue.value = isResponding;
  isTyping.value = isResponding;
};
const controlTitle = computed(() =>
  respondValue.value ? "停止响应" : "重新生成"
);
const scrollToBottom = () => {
  if (messagePanelRef.value) {
    messagePanelRef.value.scrollTop = messagePanelRef.value.scrollHeight;
  }
};

onMounted(() => {
  initSession();
  scrollToBottom();
});
</script>

<template>
  <el-card class="w-full flex">
    <!-- 聊天面板-->
    <div class="flex bg-[var(--el-bg-color)]">
      <!--会话列表-->
      <div
        class="bg-[rgb(32,33,35)] w-[250px] text-white dark:text-white rounded-tl-[var(--el-card-border-radius)] rounded-bl-[var(--el-card-border-radius)] relative border-r-[1px] border-solid border-white/20 p-2"
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
      <div class="w-full h-[800px] relative">
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
        <!-- <TextLoading /> -->
        <!--会话内容-->
        <div class="overflow-y-auto h-[65%]" ref="messagePanelRef">
          <!-- <TransitionGroup name="message" tag="div"> -->
          <Message
            v-for="(message, index) in activeSession.message"
            :key="message.createTime + index"
            :message="message"
            :isTyping="index === activeSession.message.length - 1 && isTyping"
            :messagePanelRef="messagePanelRef"
            @respond="responding"
          />
          <!-- </TransitionGroup> -->
        </div>
        <div
          class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent bg-inherit md:!bg-transparent pt-2 md:pl-2 md:w-[calc(100%)-0.5rem]"
        >
          <form
            class="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
          >
            <div class="relative flex h-full flex-1 items-stretch md:flex-col">
              <div
                class="h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center"
              >
                <el-button>
                  <IconifyIconOffline
                    :icon="Refresh"
                    class="mr-2"
                    v-if="!respondValue"
                  />
                  <IconifyIconOffline :icon="Stop" class="mr-2" v-else />
                  {{ controlTitle }}
                </el-button>
              </div>
              <ChatInput @send="handleSendMessage" :respond="respondValue" />
            </div>
          </form>
        </div>
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
// .message-enter-active,
// .message-leave-active {
//   transition: opacity 0.5s, transform 0.5s;
// }
// .message-enter-from,
// .message-leave-to {
//   opacity: 0;
//   transform: translateX(30px);
// }
// .message-move {
//   transition: transform 3s ease-in-out;
// }
</style>

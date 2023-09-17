<script setup lang="ts">
import { PropType, ref, onMounted, onBeforeUnmount } from "vue";
import TextLoading from "./textLoading.vue";
import { ChatMessage } from "../type";
import User from "@/assets/user.png";
import PureAdmin from "@/assets/login/avatar.svg";
import { MdPreview } from "md-editor-v3";
defineOptions({
  name: "Message"
});
const props = defineProps({
  message: { type: Object as PropType<ChatMessage>, required: true },
  isTyping: { type: Boolean, default: false },
  messagePanelRef: { type: Object, default: null }
});
const emit = defineEmits<{
  respond: [isResponding: boolean];
}>();
const typedText = ref("");
const shouldScrollToBottom = ref(true);
const stopTypingFlag = ref(false);
let typingInterval = null;
// const markdownContent = ref<HTMLElement | null>(null);
const showTypingEffect = () => {
  typedText.value = "";
  emit("respond", true);
  const messageContent = props.message.content;
  let index = 0;
  typingInterval = setInterval(() => {
    if (index < messageContent.length) {
      typedText.value += messageContent[index];
      index++;
      scrollToBottom();
    } else {
      clearInterval(typingInterval);
      emit("respond", false);
    }
  }, 50);
};

const toggleTyping = () => {
  if (props.isTyping) {
    stopTyping();
  } else {
    restartTyping();
  }
};
const stopTyping = () => {
  clearInterval(typingInterval);
  emit("respond", false);
  stopTypingFlag.value = true;
};
const restartTyping = () => {
  stopTyping();
  stopTypingFlag.value = false;
  typedText.value = "";
  showTypingEffect();
};
// const typedTextWithCursor = computed(() => {
//   return `${typedText.value}<span class="cursor">|</span>`;
// });
const handleScroll = () => {
  const messagePanel = props.messagePanelRef;
  if (messagePanel) {
    const { scrollTop, scrollHeight, clientHeight } = messagePanel;
    shouldScrollToBottom.value = scrollHeight - scrollTop - clientHeight <= 1;
    console.log(shouldScrollToBottom.value);
  }
};
const scrollToBottom = () => {
  if (shouldScrollToBottom.value) {
    requestAnimationFrame(() => {
      const messagePanel = props.messagePanelRef;
      if (messagePanel) {
        messagePanel.scrollTop = messagePanel.scrollHeight;
      }
    });
  }
};
onMounted(() => {
  if (props.messagePanelRef) {
    props.messagePanelRef.addEventListener("scroll", handleScroll);
  }
  if (props.isTyping) {
    showTypingEffect();
  }
  scrollToBottom();
});
onBeforeUnmount(() => {
  if (props.messagePanelRef) {
    props.messagePanelRef.removeEventListener("scroll", handleScroll);
  }
});
defineExpose({
  toggleTyping
});
</script>

<template>
  <!--消息组-->
  <div
    class="group w-full border-b border-black/10 dark:border-gray-900/50"
    :class="
      props.message.role === 'user'
        ? ''
        : 'bg-gray-50 dark:bg-[rgba(52,53,65,1)]'
    "
  >
    <!--消息行-->
    <div class="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
      <!--居中样式-->
      <div
        class="flex flex-1 gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl"
      >
        <!--头像-->
        <el-avatar
          :src="props.message.role === 'user' ? User : ''"
          :icon="props.message.role === 'user' ? '' : PureAdmin"
          shape="square"
        />
        <!--消息实体-->
        <div
          class="relative flex w-[calc(100%-115px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]"
        >
          <div class="flex flex-grow flex-col gap-3 max-w-full">
            <div
              class="min-h-[20px] flex flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words"
            >
              <MdPreview
                :model-value="
                  props.message.role !== 'user' && (isTyping || stopTypingFlag)
                    ? typedText
                    : props.message.content
                "
                theme="light"
                :previewTheme="'github'"
                v-if="props.message.content"
              />
              <TextLoading v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.el-avatar {
  --el-avatar-bg-color: var(--el-color-primary);
}

//未实现的闪烁的光标效果
.cursor {
  display: inline-block;
  animation: blink 1s step-start infinite;
}
</style>

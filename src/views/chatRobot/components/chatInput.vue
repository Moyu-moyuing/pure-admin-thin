<script setup lang="ts">
import { ref, PropType } from "vue";
//@ts-ignore
import Send from "@iconify-icons/material-symbols/send";
import TextLoading from "./textLoading.vue";
defineOptions({
  name: "ChatInput"
});
const emit = defineEmits<{
  send: [message: string];
}>();
const props = defineProps({
  respond: { type: Boolean as PropType<boolean>, required: true }
});
const message = ref("");
const sendMessage = () => {
  emit("send", message.value);
  message.value = "";
};
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <div class="flex w-full items-center">
    <el-input
      class="relative"
      size="large"
      v-model="message"
      :autosize="{ minRows: 1, maxRows: 8 }"
      @keydown.enter="handleKeyDown"
      type="textarea"
      placeholder="输入问题..."
    />
    <button
      class="absolute p-1 rounded-md md:p-2 md:right-3 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-[var(--el-color-primary)] text-white transition-colors disabled:opacity-40"
      :disabled="!message"
      @click="sendMessage"
      v-if="!props.respond"
    >
      <IconifyIconOffline :icon="Send" />
    </button>
    <TextLoading class="absolute md:right-3 right-2" v-else />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  padding-top: 12px;
  padding-right: 40px;
  padding-bottom: 12px;
  border-radius: 0.75rem;
}

@media (width >= 768px) {
  :deep(.el-textarea__inner) {
    padding: 1rem 2.5rem 1rem 1rem;
  }
}
</style>

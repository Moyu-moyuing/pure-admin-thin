<script setup lang="ts">
import { ChatSession } from "../type";
import Message from "@iconify-icons/ep/chat-square";
import Edit from "@iconify-icons/ep/edit";
import Delete from "@iconify-icons/ep/delete";
import { InfoFilled } from "@element-plus/icons-vue";
defineOptions({
  name: "SessionItem"
});
const props = defineProps<{ active: boolean; session: ChatSession }>();
const emit = defineEmits<{ delete: [session: ChatSession] }>();

const sessions: ChatSession = {
  title: "新的聊天",
  time: "2023-08-28",
  sessionNum: 0
};
const handleDeleteSession = () => {
  emit("delete", sessions);
};
</script>

<template>
  <div
    :class="[
      'p-3 relative cursor-pointer overflow-hidden',
      'flex items-center gap-3 break-all rounded-md',
      'hover:bg-[#2A2B32] hover:pr-4',
      props.active ? 'bg-[#343541]' : ''
    ]"
  >
    <IconifyIconOffline class="text-gray-300" :icon="Message" />
    {{ sessions.title }}
    <div class="absolute flex right-1 z-10 text-gray-300" v-if="props.active">
      <IconifyIconOffline :icon="Edit" class="hover:text-white mr-1" />
      <el-popconfirm
        width="220"
        confirm-button-text="是"
        cancel-button-text="否"
        :icon="InfoFilled"
        icon-color="var(--el-color-primary)"
        title="确定要删除此会话吗？"
        @confirm="handleDeleteSession"
      >
        <template #reference>
          <IconifyIconOffline :icon="Delete" class="hover:text-white mr-1" />
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

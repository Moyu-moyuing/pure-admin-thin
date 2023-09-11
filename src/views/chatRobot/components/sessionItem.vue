<script setup lang="ts">
import { ref } from "vue";
import { ChatSession } from "../type";
import Message from "@iconify-icons/ep/chat-square";
import Edit from "@iconify-icons/ep/edit";
import Delete from "@iconify-icons/ep/delete";
import Check from "@iconify-icons/ep/check";
import Close from "@iconify-icons/ep/close";
import { InfoFilled } from "@element-plus/icons-vue";
import { nextTick } from "process";
defineOptions({
  name: "SessionItem"
});
const props = defineProps<{ active: boolean; session: ChatSession }>();
const emit = defineEmits<{
  delete: [session: ChatSession];
  updateTitle: [session: ChatSession, newTitle: string];
}>();
const isEditing = ref(false);
const editedTitle = ref(props.session.title);

const sessionInput = ref<HTMLInputElement | null>(null);
// const sessions: ChatSession = {
//   id: 0,
//   title: "新的聊天",
//   time: "2023-08-28",
//   sessionNum: 0,
//   message: []
// };
const handleDeleteSession = () => {
  emit("delete", props.session);
};

const startEdit = () => {
  isEditing.value = true;
  nextTick(() => {
    sessionInput.value.focus();
  });
};
const handleBlur = () => {
  cancelUpdateSessionTitle();
};

const updateSessionTitle = () => {
  isEditing.value = false;
  emit("updateTitle", props.session, editedTitle.value);
  // 在事件循环的下一个tick中重置标志
};
const cancelUpdateSessionTitle = () => {
  isEditing.value = false;
  editedTitle.value = props.session.title;
  // 在事件循环的下一个tick中重置标志
};
</script>

<template>
  <div
    :class="[
      'p-3 relative cursor-pointer overflow-hidden',
      'flex items-center gap-3 break-all rounded-md h-[45px]',
      'hover:bg-[#2A2B32] hover:pr-4',
      props.active ? 'bg-[#343541]' : ''
    ]"
  >
    <IconifyIconOffline class="text-gray-300 mr-1" :icon="Message" />
    <!-- 如果处于编辑模式，显示输入框，否则显示标题 -->
    <input
      ref="sessionInput"
      class="bg-transparent border-0 session-title focus:ring-0 focus:border focus:border-blue-500 rounded-none focus:outline-none text-current font-inherit leading-inherit inline-block"
      v-if="isEditing"
      v-model="editedTitle"
      @blur="handleBlur"
    />
    <span class="session-title border-l border-transparent" v-else>{{
      props.session.title
    }}</span>
    <div
      class="absolute flex right-1 z-10 text-gray-300"
      v-if="props.active && !isEditing"
    >
      <IconifyIconOffline
        :icon="Edit"
        class="hover:text-white mr-1"
        @click="startEdit"
      />
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
    <div
      class="absolute flex right-1 z-10 text-gray-300"
      v-if="props.active && isEditing"
    >
      <IconifyIconOffline
        :icon="Check"
        class="hover:text-white mr-1"
        @mousedown.prevent="updateSessionTitle"
      />
      <!--使用mousedown而非click是因为click：输入框会首先触发blur事件，
        然后再触发点击事件，导致在确认修改之前，失焦事件已经恢复了原始标题
      使用 @mousedown.prevent 事件代替 @click 事件来处理图标的点击。这会
      阻止失焦事件触发，这会在鼠标按钮被按下时阻止默认行为和事件冒泡，
      确保输入框不会失焦，直到我们处理完图标的点击事件。
      这样，当点击图标时，会首先触发 @mousedown.prevent 事件，从而优先处理
      逻辑，然后输入框会失焦，但失焦的默认行为已被阻止，所以 @blur 事件不会执行。
      而当在输入框外的其他位置点击时，输入框会正常失焦，并触发 @blur 事件来更新标题-->
      <IconifyIconOffline
        :icon="Close"
        class="hover:text-white mr-1"
        @mousedown.prevent="cancelUpdateSessionTitle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.session-title {
  display: inline-block;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

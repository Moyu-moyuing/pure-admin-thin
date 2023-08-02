<script setup lang="ts">
import Search from "@iconify-icons/ep/search";
import { ref, Ref } from "vue";
import { useControlD3StoreHook } from "@/store/modules/controlD3";
import mdiKeyboardEsc from "@/assets/svg/keyboard_esc.svg?component";
import enterOutlined from "@/assets/svg/enter_outlined.svg?component";
defineOptions({
  name: "SearchNodes"
});

const wordData: Ref<string> = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const emit = defineEmits<{
  (e: "searchNodes", value: string): void;
}>();

const handleClose = () => {
  wordData.value = "";
  useControlD3StoreHook().updateShowValue();
};
const handleEnter = () => {
  emit("searchNodes", wordData.value);
  handleClose();
};
</script>

<template>
  <el-dialog
    class="new-dialog"
    width="40vw"
    top="5vh"
    v-model="useControlD3StoreHook().showSearch"
    :show-close="false"
    :style="{
      borderRadius: '6px'
    }"
    :before-close="handleClose"
    @keyup.esc="handleClose"
    @opened="inputRef.focus()"
    @closed="inputRef.blur()"
  >
    <el-input
      ref="inputRef"
      v-model="wordData"
      clearable
      placeholder="请输入节点名称..."
      @keyup.enter="handleEnter"
    >
      <template #prefix>
        <IconifyIconOffline
          :icon="Search"
          class="text-primary w-[24px] h-[24px]"
        />
      </template>
    </el-input>
    <template #footer>
      <div class="search-footer text-[#333] dark:text-white">
        <span class="search-footer-item">
          <enterOutlined class="icon" />
          确认
        </span>
        <span class="search-footer-item">
          <mdiKeyboardEsc class="icon" />
          关闭
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.new-dialog {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .el-input__inner {
    font-size: 1.2em;
  }

  .el-dialog__footer {
    padding-bottom: 10px;
    box-shadow: 0 -1px 0 0 #e0e3e8, 0 -3px 6px 0 rgb(69 98 155 / 12%);
  }
}

.search-footer {
  display: flex;

  .search-footer-item {
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
  }

  .icon {
    padding: 2px;
    margin-right: 3px;
    font-size: 20px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;
  }

  .search-footer-total {
    position: absolute;
    right: 20px;
  }
}
</style>

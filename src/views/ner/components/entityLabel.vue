<script setup lang="ts">
import { computed, ref } from "vue";
import { Entity } from "../type";
defineOptions({
  name: "EntityLabel"
});

const props = defineProps<{ entity: Entity }>();
// const emit = defineEmits(["entity-clicked"]);
// const handleEntityClick = () => {
//   emit("entity-clicked", props.entity);
// };
const getEntityId = computed(() => `entity-${props.entity.id}`);
const isHovered = ref(false);
</script>

<template>
  <span class="whitespace-normal">
    <mark
      class="cursor-pointer relative text-inherit my-0 mx-[0.15rem] inline px-1 py-[0.4rem] bg-[#ffe184] font-bold leading-none box-decoration-clone rounded-lg"
      :class="
        isHovered ? 'border-4 border-[var(--el-color-primary)]' : 'border-0'
      "
      @mouseover="isHovered = true"
      @mouseout="isHovered = false"
    >
      <span
        class="mr-[-1px] mx-[1px] my-0 inline-block relative"
        :id="getEntityId"
      >
        {{ props.entity.text }}
      </span>
      <span
        class="text-[var(--el-color-primary)] text-sm font-bold ml-2 uppercase align-middle"
        >{{ props.entity.type }}</span
      >
    </mark>
  </span>
</template>

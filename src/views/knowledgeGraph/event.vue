<script setup lang="ts">
import EventTable from "./EE/components/eventTable.vue";
defineOptions({
  name: "EE"
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <h2>事件抽取图表</h2>
    </template>
    <EventTable />
  </el-card>
</template>

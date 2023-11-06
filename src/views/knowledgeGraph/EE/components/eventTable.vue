<script setup lang="ts">
import { tableData } from "../data/data";
defineOptions({
  name: "EventTable"
});
const columns: TableColumnList = [
  { type: "index", index: "id", fixed: true },
  {
    label: "日期",
    prop: "date"
  },
  {
    label: "文本句",
    prop: "text"
  },
  {
    label: "事件",
    children: [
      { label: "事件类型", prop: "events.event_type" },
      { label: "触发词", prop: "events.trigger.keywords" },
      { label: "触发词位置", prop: "events.trigger.position" },
      { label: "参数列表", prop: "events.trigger.arguments" }
    ]
  },
  { label: "句子索引", prop: "sent_id" }
];
</script>
<template>
  <pure-table :data="tableData" :columns="columns" alignWhole="center" />
</template>

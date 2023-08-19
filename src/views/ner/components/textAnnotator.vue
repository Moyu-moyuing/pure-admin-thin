<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import EntityLabel from "./entityLabel.vue";
import { Token, Relationship, testTokens, testRelationships } from "../type";
import { debounce } from "@pureadmin/utils";
// import { debounce } from "@pureadmin/utils";
defineOptions({
  name: "TextAnnotator"
});

const annotatorContainer = ref<HTMLDivElement | null>(null);
const annotator = ref<HTMLDivElement | null>(null);
const svgLayer = ref<SVGSVGElement | null>(null);
const BASE_OFFSET = 20;
const OFFSET_INCREMENT = 15;
const PADDING_OFFSET = 8;

const tokens = ref<Array<Token>>([]);
const relationships = ref<Array<Relationship>>([]);
const svgRelations = ref([]);
const svgBadges = ref([]);

const badgeWidth = 20;
const badgeHeight = 20;

const init = () => {
  tokens.value = testTokens;
  relationships.value = testRelationships;
};

const getEntityPosition = (entityId: string) => {
  const entityElement = annotator.value?.querySelector(`#entity-${entityId}`);
  if (entityElement) {
    const rect = entityElement.getBoundingClientRect();
    const containerRect = annotatorContainer.value.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    return {
      left: rect.left - containerRect.left + halfWidth,
      top: rect.top - containerRect.top - PADDING_OFFSET,
      bottom: rect.bottom - containerRect.top + PADDING_OFFSET
    };
  }
  return { left: 0, top: 0, bottom: 0 };
};
const estimateTextLength = text => {
  // 一个粗略的估计方法：使用每个字符平均的宽度
  const averageCharWidth = 10; // 假设每个字符的平均宽度为8px
  return text.length * averageCharWidth;
};
const drawRelationships = () => {
  const paths = [];
  const rowRelationsCounter = {}; //存储每行关系的数量
  const badges = []; //存储标签信息
  let midX, midY;
  relationships.value.forEach(rel => {
    const sourcePosition = getEntityPosition(rel.sourceEntityId);
    const targetPosition = getEntityPosition(rel.targetEntityId);
    if (!sourcePosition || !targetPosition) return;
    let path;
    //如果在同一行
    if (Math.abs(sourcePosition.top - targetPosition.top) < 10) {
      //检查同一行的关系数
      if (!rowRelationsCounter[sourcePosition.top])
        rowRelationsCounter[sourcePosition.top] = 0;
      const currentOffset =
        BASE_OFFSET +
        rowRelationsCounter[sourcePosition.top] * OFFSET_INCREMENT;
      rowRelationsCounter[sourcePosition.top]++;
      // const midX = (sourcePosition.left + targetPosition.left) / 2;
      path = `M ${sourcePosition.left} ${sourcePosition.top} L ${
        sourcePosition.left
      } ${sourcePosition.top - currentOffset} L ${targetPosition.left} ${
        sourcePosition.top - currentOffset
      } L ${targetPosition.left} ${targetPosition.top - PADDING_OFFSET}`;

      midX = (sourcePosition.left + targetPosition.left) / 2;
      midY = sourcePosition.top - currentOffset;
    } else if (targetPosition.top > sourcePosition.top) {
      //目标在下一行
      path = `M ${sourcePosition.left} ${sourcePosition.bottom} C ${
        sourcePosition.left
      } ${(sourcePosition.bottom + targetPosition.top) / 2}, ${
        targetPosition.left
      } ${(sourcePosition.bottom + targetPosition.top) / 2}, ${
        targetPosition.left
      } ${targetPosition.top - PADDING_OFFSET}`;
      midX = (sourcePosition.left + targetPosition.left) / 2;
      midY = (sourcePosition.bottom + targetPosition.top) / 2;
    } else {
      path = `M ${sourcePosition.left} ${sourcePosition.top} C ${
        sourcePosition.left
      } ${(sourcePosition.top + targetPosition.bottom) / 2}, ${
        targetPosition.left
      } ${(sourcePosition.top + targetPosition.bottom) / 2}, ${
        targetPosition.left
      } ${targetPosition.bottom + PADDING_OFFSET}`;
      midX = (sourcePosition.left + targetPosition.left) / 2;
      midY = (sourcePosition.top + targetPosition.bottom) / 2;
    }
    paths.push({
      id: `${rel.sourceEntityId}_${rel.targetEntityId}`,
      path,
      type: rel.type
    });
    const textLength = estimateTextLength(rel.type); // 估计文本长度的辅助函数
    badges.push({
      x: midX - (badgeWidth + textLength) / 2, // 使badge在中点上水平居中
      y: midY - badgeHeight / 2, // 使badge在中点上垂直居中
      text: rel.type,
      textX: midX,
      textY: midY,
      textL: textLength
    });
  });
  svgRelations.value = paths;
  svgBadges.value = badges;
};
//增加防抖效果
const handleWindowResize = debounce(() => {
  nextTick(() => {
    drawRelationships();
  });
}, 200);
// const handleWindowResize = () => {
//   nextTick(() => {
//     drawRelationships();
//   });
// };

onMounted(() => {
  init();
  nextTick(() => {
    drawRelationships();
  });
  window.addEventListener("resize", handleWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleWindowResize);
});
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="text-center">
          <span class="font-center text-xl">命名实体识别 </span>
        </div>
      </template>
      <div
        class="relative w-full h-96 text-xl whitespace-pre break-words m-2.5 overflow-x-hidden overflow-y-auto"
        ref="annotatorContainer"
      >
        <div
          ref="annotator"
          class="relative z-[0] w-full h-full p-10 leading-[5]"
        >
          <template v-for="(token, index) in tokens" :key="index">
            <EntityLabel v-if="token.entity" :entity="token.entity" />
            <span
              v-else
              class="whitespace-normal mr-[-1px] mx-[1px] my-0 inline-block relative"
              >{{ token.text }}</span
            >
          </template>
        </div>
        <svg
          ref="svgLayer"
          class="absolute top-0 left-0 w-screen h-screen pointer-events-none z-[1]"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="0"
              refY="3"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="var(--el-color-primary)" />
            </marker>
          </defs>
          <path
            v-for="relationPath in svgRelations"
            :key="relationPath.id"
            :d="relationPath.path"
            fill="none"
            stroke="var(--el-color-primary)"
            stroke-width="2"
            marker-end="url(#arrow)"
          />
          <rect
            v-for="badge in svgBadges"
            :key="badge"
            :x="badge.x"
            :y="badge.y"
            :width="badgeWidth + badge.textL"
            :height="badgeHeight"
            rx="5"
            ry="5"
            fill="var(--el-color-primary)"
          />
          <text
            v-for="badge in svgBadges"
            :key="badge"
            :x="badge.textX"
            :y="badge.textY"
            text-anchor="middle"
            dominant-baseline="central"
            class="text-sm font-bold z-[100]"
            fill="var(--el-bg-color)"
          >
            {{ badge.text }}
          </text>
        </svg>
      </div>
    </el-card>
  </div>
</template>

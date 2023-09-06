<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  computed,
  ComputedRef,
  Ref
} from "vue";
import EntityLabel from "./entityLabel.vue";
import {
  Token,
  Relationship,
  testTokens,
  testRelationships,
  testEntityType
} from "../type";
import { debounce } from "@pureadmin/utils";
// import { debounce } from "@pureadmin/utils";
defineOptions({
  name: "TextAnnotator"
});

const BASE_OFFSET = 30; //基本高度偏移量
// const OFFSET_INCREMENT = 15;
const VERTICAL_OFFSET_MIN = -15; //高度偏移量最小值
const VERTICAL_OFFSET_MAX = 15; //高度偏移量最大值
const PADDING_OFFSET = 8;
const badgeWidth = 20;
const badgeHeight = 20;
// const OFFSET_STEP = 5; // 偏移量步长，可以根据需要调整

const annotatorContainer: Ref<HTMLDivElement> = ref<HTMLDivElement | null>(
  null
);
const annotator: Ref<HTMLDivElement> = ref<HTMLDivElement | null>(null);
const svgLayer: Ref<SVGSVGElement> = ref<SVGSVGElement | null>(null);

const tokens: Ref<
  {
    text: string;
    entity?: {
      id: string;
      text: string;
      type: string;
    };
  }[]
> = ref<Array<Token>>([]);
const relationships: Ref<
  {
    sourceEntityId: string;
    targetEntityId: string;
    type: string;
  }[]
> = ref<Array<Relationship>>([]);
const svgRelations: Ref<any[]> = ref([]);
const svgBadges: Ref<any[]> = ref([]);
const entityLabel: any = ref(null);

const init: () => void = () => {
  tokens.value = testTokens;
  relationships.value = testRelationships;
  entityLabel.value = testEntityType;
};

const getEntityPosition: (entityId: string) =>
  | {
      left: number;
      top: number;
      bottom: number;
      width: number;
    }
  | {
      left: number;
      top: number;
      bottom: number;
      width?: undefined;
    } = (entityId: string) => {
  const entityElement = annotator.value?.querySelector(`#entity-${entityId}`);
  if (entityElement) {
    const rect = entityElement.getBoundingClientRect();
    const containerRect = annotatorContainer.value.getBoundingClientRect();
    // const halfWidth = rect.width / 2;
    return {
      left: rect.left - containerRect.left,
      top: rect.top - containerRect.top - PADDING_OFFSET,
      bottom: rect.bottom - containerRect.top + PADDING_OFFSET,
      width: rect.width
    };
  }
  return { left: 0, top: 0, bottom: 0 };
};
const estimateTextLength: (text: any) => number = text => {
  // 一个粗略的估计方法：使用每个字符平均的宽度
  const averageCharWidth = 10; // 假设每个字符的平均宽度为10px
  return text.length * averageCharWidth;
};
const drawRelationships: () => void = () => {
  const paths = [];
  // const rowRelationsCounter = {}; //存储每行关系的数量
  const badges = []; //存储标签信息

  let midX, midY;

  relationships.value.forEach(rel => {
    //获取实体坐标信息
    const sourcePosition = getEntityPosition(rel.sourceEntityId);
    const targetPosition = getEntityPosition(rel.targetEntityId);

    // 在实体的长度范围内随机选择一个点作为关系的起点或终点
    const sourceOffset = Math.random() * sourcePosition.width;
    const targetOffset = Math.random() * targetPosition.width;

    // 在定义的范围内随机选择一个垂直偏移量
    const currentOffset =
      BASE_OFFSET +
      VERTICAL_OFFSET_MIN +
      Math.random() * (VERTICAL_OFFSET_MAX - VERTICAL_OFFSET_MIN);

    // 应用随机偏移量
    sourcePosition.left += sourceOffset; // 开始偏移
    targetPosition.left += targetOffset;

    if (!sourcePosition || !targetPosition) return;
    let path;
    //如果在同一行，绘制矩形折线
    if (Math.abs(sourcePosition.top - targetPosition.top) < 10) {
      //检查同一行的关系数，没增加一个，关系路径往上偏移一个单位OFFSET_INCREMENT
      // if (!rowRelationsCounter[sourcePosition.top])
      //   rowRelationsCounter[sourcePosition.top] = 0;
      // const currentOffset =
      //   BASE_OFFSET +
      //   rowRelationsCounter[sourcePosition.top] * OFFSET_INCREMENT;
      // rowRelationsCounter[sourcePosition.top]++;
      path = `M ${sourcePosition.left} ${sourcePosition.top} L ${
        sourcePosition.left
      } ${sourcePosition.top - currentOffset} L ${targetPosition.left} ${
        sourcePosition.top - currentOffset
      } L ${targetPosition.left} ${targetPosition.top - PADDING_OFFSET}`;

      midX = (sourcePosition.left + targetPosition.left) / 2;
      midY = sourcePosition.top - currentOffset;
    } else if (targetPosition.top > sourcePosition.top) {
      //目标在下一行，绘制贝塞尔曲线
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
      //目标在上一行，绘制贝塞尔曲线
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
      id: `${rel.sourceEntityId}_${rel.type}_${rel.targetEntityId}`,
      path,
      type: rel.type,
      hovered: false
    });
    const textLength = estimateTextLength(rel.type); // 估计文本长度的辅助函数
    badges.push({
      id: `${rel.sourceEntityId}_${rel.type}_${rel.targetEntityId}`,
      x: midX - (badgeWidth + textLength) / 2, // 使badge在中点上水平居中
      y: midY - badgeHeight / 2, // 使badge在中点上垂直居中
      text: rel.type,
      textX: midX,
      textY: midY,
      textL: textLength,
      hovered: false
    });
  });
  svgRelations.value = paths;
  svgBadges.value = badges;
};
//增加防抖效果
const handleWindowResize: () => void = debounce(() => {
  if (window.innerWidth <= 425) {
    //设置一定的浏览器宽度，达到某种条件才重绘
    //大大减少svg重绘的计算
    nextTick(() => {
      drawRelationships();
    });
  }
}, 200);
// const handleWindowResize = () => {
//   nextTick(() => {
//     drawRelationships();
//   });
// };

//固定内容显示长宽，并让svg的宽高随之变化，减少由于重新排布导致的多次svg重绘性能问题
const svgHeight: ComputedRef<string> = computed(() => {
  if (annotatorContainer.value)
    return annotatorContainer.value.scrollHeight + "px";
  return "100vh";
});
const svgWidth: ComputedRef<string> = computed(() => {
  if (annotatorContainer.value)
    return annotatorContainer.value.scrollWidth + "px";
  return "100vh";
});

function handleHover(id, isHovered) {
  // 根据id查找relationPath和badge

  const relation = svgRelations.value.find(r => r.id === id);
  const badge = svgBadges.value.find(b => b.id === id);
  if (relation) {
    relation.hovered = isHovered;
  }
  if (badge) {
    badge.hovered = isHovered;
  }
}

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
        <div class="flex items-center justify-center flex-wrap gap-2">
          <div
            v-for="label in entityLabel"
            :key="label"
            class="flex items-center justify-center"
          >
            <el-button plain type="primary">
              {{ label }}
            </el-button>
          </div>
        </div>
      </template>
      <div
        class="relative w-full h-96 text-xl whitespace-pre break-words m-2.5 overflow-x-auto overflow-y-auto"
        ref="annotatorContainer"
      >
        <div
          ref="annotator"
          class="relative z-[0] w-[1800px] h-full p-10 leading-[5]"
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
          class="absolute top-0 left-0 pointer-events-none z-[1]"
          :style="{ height: svgHeight, width: svgWidth }"
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
            <marker
              id="hoveredArrow"
              markerWidth="15"
              markerHeight="15"
              refX="3.6"
              refY="4.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L0,9 L13.5,4.5 z" fill="var(--el-color-primary)" />
            </marker>
          </defs>
          <path
            class="cursor-pointer"
            v-for="relationPath in svgRelations"
            :key="relationPath.id"
            :d="relationPath.path"
            fill="none"
            stroke="var(--el-color-primary)"
            :stroke-width="relationPath.hovered ? '4' : '2'"
            :marker-end="
              relationPath.hovered ? 'url(#hoveredArrow)' : 'url(#arrow)'
            "
            pointer-events="auto"
            @mouseover="handleHover(relationPath.id, true)"
            @mouseout="handleHover(relationPath.id, false)"
          />
          <rect
            class="cursor-pointer"
            v-for="badge in svgBadges"
            :key="badge"
            :x="
              badge.hovered
                ? badge.x - (badgeWidth + badge.textL) * 0.1
                : badge.x
            "
            :y="badge.hovered ? badge.y - badgeHeight * 0.1 : badge.y"
            :width="
              badge.hovered
                ? (badgeWidth + badge.textL) * 1.2
                : badgeWidth + badge.textL
            "
            :height="badge.hovered ? badgeHeight * 1.2 : badgeHeight"
            rx="5"
            ry="5"
            fill="var(--el-color-primary)"
            pointer-events="auto"
            @mouseover="handleHover(badge.id, true)"
            @mouseout="handleHover(badge.id, false)"
          />
          <text
            v-for="badge in svgBadges"
            :key="badge"
            :x="badge.textX"
            :y="badge.textY"
            text-anchor="middle"
            dominant-baseline="central"
            :class="
              badge.hovered
                ? 'text-base font-bold z-[100]'
                : 'text-sm font-bold z-[100]'
            "
            fill="var(--el-bg-color)"
          >
            {{ badge.text }}
          </text>
        </svg>
      </div>
    </el-card>
  </div>
</template>

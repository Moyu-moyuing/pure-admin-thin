<!-- 
 * @description: //TODO
 * @fileName: graphPanel.vue 
 * @author: Moyu-moyuing
 * @date: 2023-07-24 13:24:55
 -->
<script setup lang="ts">
import * as d3 from "d3";
import Control from "./control.vue";
import NodePanel from "./nodePanel.vue";
import SearchNodes from "./searchNodes.vue";
import { ref, Ref, onMounted } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import { useControlD3StoreHook } from "@/store/modules/controlD3";
import {
  List,
  Node,
  Link,
  getAllDatas,
  getDatasByName,
  getDatasByRelation
} from "@/api/kgData";
import { ElMessage } from "element-plus";
// import list from "../data/data.js";

defineOptions({
  name: "GraphPanel"
});
class SearchError extends Error {}
//数据区
/**
 * d3相关数据定义
 */
let data: List;
let links: any;
let nodes: any;
let zoom: d3.ZoomBehavior<Element, unknown>;
let simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
const color: d3.ScaleOrdinal<string, string, never> = d3.scaleOrdinal(
  d3.schemeCategory10
);
const width: number = window.innerWidth;
const height: number = window.innerHeight;
// 控制贝塞尔曲线的偏移量，也即“C”的大小
const BASE_OFFSET = 150;

/**
 * 响应式数据定义
 */
const scale: Ref<number> = ref(1);
const nodeInfo: Ref<Node> = ref(null);
const linkInfo: Ref<Array<Link>> = ref(null);
const nodecolor: Ref<string> = ref("");
const allLinks: Ref<string[]> = ref(null);
const relationTag: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);
const nodePanelLoading: Ref<boolean> = ref(false);
const tags = ref(null);

//函数区
const initConfig: () => void = () => {
  //力导向图
  simulation = d3
    //ts-ignore
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        //@ts-ignore 忽略类型检查
        .id(d => d.name)
        .distance(200)
    )
    .force(
      "collide",
      d3.forceCollide().radius(() => 40)
    ) //设置碰撞半径
    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2));

  zoom = d3
    .zoom()
    //设置缩放范围
    .scaleExtent([0.2, 3])
    //设置平移范围
    .extent([
      [0, 0],
      [width, height]
    ]);
};

const renderGraph: () => SVGSVGElement = () => {
  // 创建svg容器.
  const svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = d3
    .select("#force-container")
    .append("svg")
    .attr("id", "d3-svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, width, height])
    .on("click", () => {
      //点击空白处节点面板刷新数据
      if (useControlD3StoreHook().hasData) {
        useControlD3StoreHook().updateHasData();
      }
    });
  //画箭头
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const marker: d3.Selection<SVGPathElement, unknown, HTMLElement, any> = svg
    .append("marker")
    .attr("id", "direction")
    .attr("orient", "auto")
    .attr("stroke-width", 2)
    .attr("markerUnits", "strokeWidth")
    .attr("markerUnits", "userSpaceOnUse")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 35)
    .attr("refY", -2.5)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 -5 L 10 0 L 0 5")
    .attr("fill", "#999")
    .attr("stroke-opacity", 0.6);
  //使用g节点包裹控制缩放
  const g: d3.Selection<SVGGElement, unknown, HTMLElement, any> = svg
    .append("g")
    .attr("width", "100%")
    .attr("height", "100%");
  //缩放事件
  zoom.on("zoom", () => {
    const transform = d3.zoomTransform(svg.node());
    // 创建一个过渡
    // g.transition()
    //   .duration(30) // 设置过渡的持续时间
    //   .ease(d3.easeCubic) // 设置缓动函数
    //@ts-ignore
    g.attr("transform", transform);
    //响应式使得网格也缩放
    scale.value = transform.k;
  });
  svg
    .call(zoom)
    .on("wheel.zoom", null) //禁用滚轮放大缩小
    .on("dblclick.zoom", null); //禁用双击放大缩小
  d3.select("#zoomIn").on("click", () => {
    zoom.scaleBy(svg, 0.9);
  });
  d3.select("#zoomOut").on("click", () => {
    zoom.scaleBy(svg, 1.1);
  });
  d3.select("#refresh").on("click", () => {
    svg.call(zoom.transform, d3.zoomIdentity);
  });
  // 画链接.
  const link: d3.Selection<
    d3.BaseType | SVGPathElement,
    unknown,
    SVGGElement,
    unknown
  > = g
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 1)
    .attr("marker-end", "url(#direction)")
    .selectAll("path")
    .data(links)
    .join("path")
    //@ts-ignore 忽略类型检查
    .attr("stroke-width", 2)
    .attr("stroke-opacity", 0.5)
    .attr("fill", "transparent")
    //@ts-ignore 忽略类型检查
    .attr(
      "id",
      //@ts-ignore 忽略类型检查
      d => d.source.name + "_" + d.relationship + "_" + d.target.name
    );

  //画节点
  const node: d3.Selection<
    d3.BaseType | SVGCircleElement,
    unknown,
    SVGGElement,
    unknown
  > = g
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 30)
    .attr("opacity", 1)
    //@ts-ignore 忽略类型检查.
    .attr("fill", d => color(d.type))
    //@ts-ignore 忽略类型检查.
    .attr("stroke", d => color(d.type) + "60")
    .attr("stroke-width", 5)
    //@ts-ignore 忽略类型检查.
    .attr("id", d => d.name)
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut)
    .on("click", getNodeInfo);

  //@ts-ignore 忽略类型检查
  node.append("title").text(d => d.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const linkNameText: d3.Selection<
    SVGTextPathElement,
    unknown,
    SVGGElement,
    unknown
  > = g
    .append("g")
    .selectAll("text")
    .data(links)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("fill", "#999")
    .attr("font-size", 20 + "px")
    .attr("font-weight", "bold")
    .append("textPath")
    .attr(
      "xlink:href",
      //@ts-ignore 忽略类型检查
      d => "#" + d.source.name + "_" + d.relationship + "_" + d.target.name
    )
    .attr(
      "id", //@ts-ignore 忽略类型检查
      d => "text_" + d.source.name + "_" + d.relationship + "_" + d.target.name
    )
    .attr("startOffset", "50%")
    //@ts-ignore 忽略类型检查
    .text(d => d.relationship);

  const nodeNameText: d3.Selection<
    d3.BaseType | SVGTextElement,
    unknown,
    SVGGElement,
    unknown
  > = g
    .append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    //@ts-ignore
    .attr("x", d => d.x)
    //@ts-ignore
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .style("cursor", "grab")
    .attr("fill", "white")
    .attr("opacity", 1)
    .attr("font-size", 30 / 2.5 + "px")
    .attr(
      "font-family",
      "-apple-system, system-ui, avenir, helvetica, roboto, noto, arial"
    ) //@ts-ignore 忽略类型检查
    .attr("id", d => "text_" + d.name)
    //@ts-ignore 忽略类型检查
    .text(d => d.name);
  // Add a drag behavior.
  node.call(drag(simulation, g));
  //为导向图添加Tick事件
  function linksTick() {
    link.attr("d", (d, i) => {
      //@ts-ignore 忽略类型检查
      if (d.source === d.target) {
        //@ts-ignore
        const cx = d.source.x;
        //@ts-ignore
        const cy = d.source.y;

        // 角度偏移
        const rotationAngle = (i * Math.PI) / 4; // 根据关系的索引来调整旋转角度

        /**
         * | x' |   | cos(angle)   -sin(angle)  |   | x - cx |
         * |    | = |                          | · |        |
         * | y' |   | sin(angle)   cos(angle) |   | y - cy |
         * @param x
         * @param y
         * @param angle
         */
        const rotate = (x, y, angle) => {
          return {
            x: cx + (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle),
            y: cy + (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle)
          };
        };

        const cp1 = rotate(cx - BASE_OFFSET, cy - BASE_OFFSET, rotationAngle);
        const cp2 = rotate(cx + BASE_OFFSET, cy - BASE_OFFSET, rotationAngle);

        // 使用M命令移动到圆心，然后使用C命令绘制一个贝塞尔曲线
        // 从圆心出发，通过两个控制点，最终返回圆心
        return `M ${cx},${cy} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${cx},${cy}`;
      } else {
        //@ts-ignore
        const dx = d.target.x - d.source.x,
          //@ts-ignore
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
        return (
          "M" +
          //@ts-ignore
          d.source.x +
          "," +
          //@ts-ignore
          d.source.y +
          "A" +
          dr +
          "," +
          dr +
          " 0 0,1 " +
          //@ts-ignore
          d.target.x +
          "," +
          //@ts-ignore
          d.target.y
        );
      }
    });
    //@ts-ignore 忽略类型检查
    node.attr("cx", d => d.x).attr("cy", d => d.y);
    //@ts-ignore 忽略类型检查
    nodeNameText.attr("x", d => d.x).attr("y", d => d.y);
  }
  simulation.on("tick", linksTick);
  //生成节点数据
  // Create a simulation with several forces.
  // Set the position attributes of links and nodes each time the simulation ticks.
  function mouseOver(d) {
    hideAllLight();
    // 移除当前节点的蒙版效果，并为其添加高亮
    d3.select(d.target).transition().attr("stroke-width", 15);
    const connectedNodes = new Set(); // 用来存储与当前节点连接的所有节点的名称
    // 找到与当前节点连接的连线，并为它们及其相应的节点移除蒙版效果

    links.forEach(l => {
      if (d.target.id === l.source.name || d.target.id === l.target.name) {
        d3.select(
          "#" + l.source.name + "_" + l.relationship + "_" + l.target.name
        ).attr("opacity", 1);
        d3.select(
          "#" +
            "text_" +
            l.source.name +
            "_" +
            l.relationship +
            "_" +
            l.target.name
        ).style("opacity", 1);

        connectedNodes.add(l.source.name);
        connectedNodes.add(l.target.name);
      }
    });
    // 确保当前鼠标悬停的节点也包含在内
    connectedNodes.add(d.target.id);
    connectedNodes.forEach(name => {
      d3.select("#" + name).attr("opacity", 1);
      d3.select("#" + "text_" + name).style("opacity", 1);
    });
  }
  function mouseOut(d) {
    d3.select(d.target).transition().attr("stroke-width", 5);
    resetAllOpacity();
  }
  return svg.node();
};

const resetAllOpacity = () => {
  d3.selectAll("circle").attr("opacity", 1);
  links.forEach(l => {
    d3.selectAll(
      "#" + l.source.name + "_" + l.relationship + "_" + l.target.name
    ).attr("opacity", 1);
    d3.selectAll(
      "#" + "text_" + l.source.name + "_" + l.relationship + "_" + l.target.name
    ).style("opacity", 1);
  });
  nodes.forEach(n => {
    d3.selectAll("#" + "text_" + n.name).style("opacity", 1);
  });
};
const hideAllLight = () => {
  d3.selectAll("circle").attr("opacity", 0.08);
  links.forEach(l => {
    d3.selectAll(
      "#" + l.source.name + "_" + l.relationship + "_" + l.target.name
    ).attr("opacity", 0.03);
    d3.selectAll(
      "#" + "text_" + l.source.name + "_" + l.relationship + "_" + l.target.name
    ).style("opacity", 0.03);
  });
  nodes.forEach(n => {
    d3.selectAll("#" + "text_" + n.name).style("opacity", 0.03);
  });
};

const drag: (
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>,
  g: d3.Selection<SVGGElement, unknown, HTMLElement, any>
) => d3.DragBehavior<Element, unknown, unknown> = (simulation, g) => {
  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event: {
    active: any;
    subject: { fx: any; x: any; fy: any; y: any };
  }) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    g.attr("cursor", "grabbing");
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event: { subject: { fx: any; fy: any }; x: any; y: any }) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event: { active: any; subject: { fx: any; fy: any } }) {
    if (!event.active) simulation.alphaTarget(0);
    g.attr("cursor", "grab");
    event.subject.fx = null;
    event.subject.fy = null;
  }
  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const clearGraph: () => void = () => {
  d3.select("#d3-svg").remove();
};

const eventControl: (name: string) => void = name => {
  console.log(name);
  if (name === "reset") {
    clearGraph();
    scale.value = 1;
    if (useControlD3StoreHook().hasData)
      useControlD3StoreHook().updateHasData();
    relationTag.value = "";
    init();
  } else if (name === "search") {
    useControlD3StoreHook().updateShowValue();
  }
};

const tagSelect: (value: string) => Promise<void> = async value => {
  loading.value = true;
  relationTag.value = value;
  if (useControlD3StoreHook().hasData) useControlD3StoreHook().updateHasData();
  await getDatasByRelation({ relations: value })
    .then(result => {
      if (result.success) {
        data = result.data.kgDatas;
        links = data.links;
        nodes = data.nodes;
        clearGraph();
        initConfig();
        renderGraph();
      } else {
        throw new SearchError("无结果");
      }
    })
    .then(() => {
      ElMessage({
        message: "查找成功",
        type: "success"
      });
    })
    .catch(error => {
      if (error instanceof SearchError) {
        ElMessage({
          message: "查找失败," + error.message + ",即将自动初始化",
          type: "error"
        });
        clearGraph();
        scale.value = 1;
        init();
      } else {
        ElMessage.error("查找失败", error.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const getNodeInfo: (e: any, d: any) => Promise<void> = async (e, d) => {
  nodePanelLoading.value = true;
  //需要优化，查节点应该由后端做
  await getDatasByName({ name: d.name })
    .then(result => {
      if (result.success) {
        nodeInfo.value = result.data.kgDatas.nodes.find(
          item => item.name === d.name
        );
        if (relationTag.value != "") {
          linkInfo.value = result.data.kgDatas.links.filter(
            item => item.relationship === relationTag.value
          );
        } else {
          linkInfo.value = result.data.kgDatas.links;
        }
        //@ts-ignore
        nodecolor.value = color(nodeInfo.value.type);
        if (!useControlD3StoreHook().hasData)
          useControlD3StoreHook().updateHasData();
      }
    })
    .then(() => {
      nodePanelLoading.value = false;
    });
};

const searchNodes: (value: string) => Promise<void> = async value => {
  loading.value = true;
  await getDatasByName({ name: value })
    .then(result => {
      if (result.success) {
        data = result.data.kgDatas;
        links = data.links;
        nodes = data.nodes;
        nodeInfo.value = nodes.find(item => item.name === value);
        //links为引用类型，并且是响应式数据，由于被init污染，需要深拷贝
        linkInfo.value = cloneDeep(links);
        //@ts-ignore
        nodecolor.value = color(nodeInfo.value.type);
        //需要后端优化——返回erro捕捉catch回调

        clearGraph();
        initConfig();
        renderGraph();

        if (!useControlD3StoreHook().hasData)
          useControlD3StoreHook().updateHasData();
      } else {
        throw new SearchError("无结果");
      }
    })
    .then(() => {
      ElMessage({
        message: "查找成功",
        type: "success"
      });
    })
    .catch(error => {
      if (error instanceof SearchError) {
        ElMessage({
          message: "查找失败," + error.message + ",即将自动初始化",
          type: "error"
        });
        clearGraph();
        scale.value = 1;
        init();
      } else {
        ElMessage.error("查找失败,", error.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const init: () => Promise<void> = async () => {
  loading.value = true;
  await getAllDatas()
    .then(result => {
      if (result.success) {
        data = result.data.kgDatas;
        links = data.links;
        nodes = data.nodes;
        tags.value = result.data.tags;
        allLinks.value = result.data.relations;
        initConfig();
        renderGraph();
      }
    })
    .then(() => {
      ElMessage({
        message: "初始化成功",
        type: "success"
      });
    })
    .catch(error => {
      ElMessage.error("初始化失败", error.message);
    })
    .finally(() => {
      loading.value = false;
    });
};
//需要注意的bug：
//如何解决tag和search的关联和冲突？
//search时要不要考虑tag的影响？

//vue API 区
// watch(
//   () => useControlD3StoreHook().control,
//   (newValue, oldValue) => {
//     console.log(newValue, oldValue);
//     /* 如果是搜索值，则
//      * data=newdata(后端返回)
//      * update(graph)
//      */
//   }
// );

onMounted(() => {
  init();
});
</script>

<template>
  <!-- <div>力导向图面板</div> -->
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex items-center justify-center flex-wrap gap-2">
          <div
            v-for="tag in tags"
            :key="tag"
            class="flex items-center justify-center"
          >
            <span
              class="mx-1 w-8 h-5 rounded"
              :style="{ background: color(tag) }"
            />
            {{ tag }}
          </div>
        </div>
      </template>
      <div class="relative m-2.5" v-loading="loading">
        <!-- 画布 -->
        <div
          id="force-container"
          class="w-screen h-screen relative z-0 bg-white/[.03]"
        >
          <div
            id="force-grid"
            class="w-full h-full bottom-0 left-0 right-0 top-0 absolute -z-[1]"
          >
            <!--这里用tailwindcss加载不出网格？只能用内联样式-->
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
            >
              <defs>
                <pattern
                  id="dots"
                  patternUnits="userSpaceOnUse"
                  :patternTransform="`scale(${scale},${scale})`"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                >
                  <rect
                    width="2"
                    height="2"
                    rx="1"
                    ry="1"
                    class="fill-gray-400 opacity-100"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        </div>
        <!-- 辅助工具栏 -->
        <Control
          class="absolute top-3 left-3 z-[101] rounded-md opacity-90"
          @eventControl="eventControl"
        />
        <!-- 节点信息面板 -->
        <NodePanel
          :node="nodeInfo"
          :links="linkInfo"
          :color="nodecolor"
          :all-links="allLinks"
          :loading="nodePanelLoading"
          @tag-select="tagSelect"
          class="absolute top-3 right-3 z-[101] w-60 h-[80%] text-center rounded-md opacity-90"
        />
      </div>
      <SearchNodes @search-nodes="searchNodes" />
    </el-card>
  </div>
</template>

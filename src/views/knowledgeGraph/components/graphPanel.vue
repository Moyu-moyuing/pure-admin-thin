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
import { useControlD3StoreHook } from "@/store/modules/controlD3";
import { List, getAllDatas, getDatasByName } from "@/api/kgData";
// import list from "../data/data.js";

defineOptions({
  name: "GraphPanel"
});
// const data = reactive({
//   nodes: [] as any,
//   links: [] as any
// });
// const datas = {
//   nodes: [
//     { id: "郭靖", group: 1 },
//     { id: "黄蓉", group: 1 },
//     { id: "杨康", group: 2 }
//   ],
//   links: [
//     { source: "郭靖", target: "黄蓉", value: 1 },
//     { source: "郭靖", target: "杨康", value: 2 }
//   ]
// };

//数据区
let data: List;

const scale: Ref<number> = ref(1);

let links: any;
let nodes: any;
let zoom: d3.ZoomBehavior<Element, unknown>;
let simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
const color: d3.ScaleOrdinal<string, string, never> = d3.scaleOrdinal(
  d3.schemeCategory10
);
const nodeInfo = ref(null);
const linkInfo = ref(null);
const nodecolor = ref("");
// Specify the dimensions of the chart.
const width: number = window.innerWidth;
const height: number = window.innerHeight;
// Specify the color scale.
// const color = d3.scaleOrdinal(d3.schemeCategory10);

//函数区
// const initData = () => {
//   getAll();
//   const link = datas.links.map((d: any) => ({ ...d }));
//   console.log(data.links);

//   console.log(link);

//   const node = datas.nodes.map((d: any) => ({ ...d }));
//   console.log(node);
//   console.log(data.nodes);

// };
const initConfig = () => {
  //力导向图
  simulation = d3
    //ts-ignore
    .forceSimulation(nodes)
    .force(
      "link",
      //@ts-ignore 忽略类型检查
      d3.forceLink(links).id(d => d.name)
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
const renderGraph = () => {
  // 创建svg容器.
  const svg = d3
    .select("#force-container")
    // .insert("svg", ".force-background")
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

  //使用g节点包裹控制缩放
  const g = svg.append("g").attr("width", "100%").attr("height", "100%");
  //缩放事件
  zoom.on("zoom", () => {
    const transform = d3.zoomTransform(svg.node());
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
  const link = g
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
    //@ts-ignore 忽略类型检查
    .attr("stroke-width", () => Math.sqrt(5));

  //画节点
  const node = g
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 30)
    .attr("opacity", 0.7)
    //@ts-ignore 忽略类型检查.
    .attr("fill", d => color(d.group))
    //@ts-ignore 忽略类型检查.
    .attr("stroke", d => color(d.group) + "60")
    .attr("stroke-width", 5)
    .on("mouseover", e => {
      d3.select(e.target).transition().attr("stroke-width", 15);
    })
    .on("mouseout", e => {
      d3.select(e.target).transition().attr("stroke-width", 5);
    })
    .on("click", getNodeInfo);

  //@ts-ignore 忽略类型检查
  node.append("title").text(d => d.name);

  const nodeNameText = g
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
    .attr("font-size", 30 / 4 + "px")
    .attr(
      "font-family",
      "-apple-system, system-ui, avenir, helvetica, roboto, noto, arial"
    )
    //@ts-ignore 忽略类型检查
    .text(d => d.name);

  // Add a drag behavior.
  node.call(drag(simulation, g));
  //为导向图添加Tick事件
  function linksTick() {
    link //@ts-ignore 忽略类型检查
      .attr("x1", d => d.source.x)
      //@ts-ignore 忽略类型检查
      .attr("y1", d => d.source.y)
      //@ts-ignore 忽略类型检查
      .attr("x2", d => d.target.x)
      //@ts-ignore 忽略类型检查
      .attr("y2", d => d.target.y);
    //@ts-ignore 忽略类型检查
    node.attr("cx", d => d.x).attr("cy", d => d.y);
    //@ts-ignore 忽略类型检查
    nodeNameText.attr("x", d => d.x).attr("y", d => d.y);
  }
  simulation.on("tick", linksTick);
  //生成节点数据
  // Create a simulation with several forces.
  // Set the position attributes of links and nodes each time the simulation ticks.
  return svg.node();
};

const drag = (
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>,
  g: d3.Selection<SVGGElement, unknown, HTMLElement, any>
) => {
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
const clearGraph = () => {
  d3.select("#d3-svg").remove();
};
const eventControl: (name: string) => void = name => {
  console.log(name);
  if (name === "reset") {
    clearGraph();
    scale.value = 1;
    init();
  } else if (name === "search") {
    useControlD3StoreHook().updateShowValue();
  }
};
async function getNodeInfo(e: any, d: any) {
  //需要优化，查节点应该由后端做
  await getDatasByName({ name: d.name }).then(result => {
    if (result.success) {
      nodeInfo.value = result.data.kgDatas.nodes.find(
        item => item.name === d.name
      );
      linkInfo.value = result.data.kgDatas.links;
      nodecolor.value = "" + color(nodeInfo.value.group);
      if (!useControlD3StoreHook().hasData)
        useControlD3StoreHook().updateHasData();
    }
  });
}
async function searchNodes(value: string) {
  await getDatasByName({ name: value }).then(result => {
    if (result.success) {
      data = result.data.kgDatas;
      links = data.links;
      nodes = data.nodes;
      nodeInfo.value = nodes.find(item => item.name === value);
      linkInfo.value = links;
      nodecolor.value = color(nodeInfo.value.group);
      //需要后端优化——返回erro捕捉catch回调，现使用setTimeout保证link不会因为init污染
      setTimeout(() => {
        clearGraph();
        initConfig();
        renderGraph();
      }, 3000);

      if (!useControlD3StoreHook().hasData)
        useControlD3StoreHook().updateHasData();
    } else {
      clearGraph();
      scale.value = 1;
      init();
    }
  });
}

// const Test = () => {
//   setTimeout(() => {
//     clearGraph();
//     initData();
//     initConfig();
//     renderGraph();
//   }, 3000);
// };
async function init() {
  await getAllDatas().then(result => {
    if (result.success) {
      data = result.data.kgDatas;
      links = data.links;
      nodes = data.nodes;
      initConfig();
      renderGraph();
    }
  });
}
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

  <el-card shadow="never">
    <template #header>
      <div class="text-center">
        <span class="font-center text-xl">知识图谱可视化 </span>
      </div>
    </template>
    <div class="relative m-2.5">
      <!-- 画布 -->
      <div
        id="force-container"
        class="w-full h-full relative z-0 bg-white/[.03]"
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
        class="absolute top-3 right-3 z-[101] w-1/5 h-[96%] text-center rounded-md opacity-90"
      />
    </div>
    <SearchNodes @search-nodes="searchNodes" />
  </el-card>
</template>

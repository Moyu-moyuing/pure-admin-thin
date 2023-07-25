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
import { ref, watch, onMounted } from "vue";
// import { useControlD3StoreHook } from "@/store/modules/controlD3";
import list from "../data.js";
import { useControlD3StoreHook } from "@/store/modules/controlD3";

defineOptions({
  name: "GraphPanel"
});
// const data = reactive({
//   nodes: [] as any,
//   links: [] as any
// });
// const data = {
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
const data = list;
const scale = ref(1);
//函数区
const initGraph = () => {
  //数据节点集
  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = data.links.map(d => ({ ...d }));
  const nodes = data.nodes.map(d => ({ ...d }));
  // Specify the dimensions of the chart.
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  //力导向图
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      //@ts-ignore 忽略类型检查
      d3.forceLink(links).id(d => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", linksTick);

  // 创建svg容器.
  const svg = d3
    .select("#force-container")
    // .insert("svg", ".force-background")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, width, height]);

  //使用g节点包裹控制缩放
  const g = svg.append("g").attr("width", "100%").attr("height", "100%");
  //缩放事件
  const zoom = d3
    .zoom()
    //设置缩放范围
    .scaleExtent([0.2, 3])
    //设置平移范围
    .extent([
      [0, 0],
      [width, height]
    ])
    .on("zoom", () => {
      const transform = d3.zoomTransform(svg.node());
      //@ts-ignore
      g.attr("transform", transform);
      //响应式使得网格也缩放
      scale.value = transform.k;

      //巨坑，调参，对g加变换参数，但回调和transform均是svg
      // 第二种写法
      //({transform})=>{g.attr("transform", transform);}

      // const transform = d3.zoomTransform(g.node());
      // g.attr(
      //   "transform",
      //   "scale(" + transform.k + ")"
      //   // "translate(" +
      //   //   -transform.x +
      //   //   "," +
      //   //   -transform.y +
      //   //   ") scale(" +
      //   //   transform.k +
      //   //   ")"
      // );
    });
  svg
    .call(zoom)
    .on("wheel.zoom", null) //禁用滚轮放大缩小
    .on("dblclick.zoom", null); //禁用双击放大缩小

  //这里只对svg加回调，而非g加
  /* 优化的可能？把d3的这些数据放外面使用ref，reactive改造
   * 成响应式数据，这样使用wacth监视而去响应事件而非直接操作dom
   * 节点，但是d3的数据经过ref改造后？ts类型是否是不兼容？
   * 归根到底，vue3的语法糖setup无法直接在子函数作用域内进行
   * 编写watch的API
   */
  d3.select("#zoomIn").on("click", () => {
    zoom.scaleBy(svg, 0.9);
  });
  d3.select("#zoomOut").on("click", () => {
    zoom.scaleBy(svg, 1.1);
  });
  d3.select("#refresh").on("click", () => {
    svg.call(zoom.transform, d3.zoomIdentity);
  });

  // if (useControlD3StoreHook().control === "zoomIn") {
  //       zoom.scaleBy(svg, 1.1);
  //     } else if (useControlD3StoreHook().control === "zoomOut") {
  //       zoom.scaleBy(svg, 0.9);
  //     } else if (useControlD3StoreHook().control === "refresh") {
  //       svg.call(zoom.transform, d3.zoomIdentity);
  //     }

  // 画链接.
  const link = g
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
    //@ts-ignore 忽略类型检查
    .attr("stroke-width", d => Math.sqrt(d.value));

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
    });

  // node.selectAll("circle")
  // .on("mouseover", () => {
  //   node.attr("stroke-width", 3);
  // })
  // .on("mouseout", () => {
  //   node.attr("stroke-width", 1.5);
  // });

  //@ts-ignore 忽略类型检查
  node.append("title").text(d => d.id);

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
    // .attr("class", "node-name")
    //@ts-ignore 忽略类型检查
    .text(d => d.id);

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
  //生成节点数据
  // Create a simulation with several forces.
  // Set the position attributes of links and nodes each time the simulation ticks.
  return svg.node();
};
const drag = (simulation, g) => {
  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    g.attr("cursor", "grabbing");
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
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
watch(
  () => useControlD3StoreHook().control,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
    /* 如果是搜索值，则
     * data=newdata(后端返回)
     * update(graph)
     */
  }
);

onMounted(() => {
  initGraph();
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
      <!-- 辅助工具栏 -->
      <Control class="absolute top-3 left-3 z-[101] rounded-md opacity-90" />
      <!-- 节点信息面板 -->
      <NodePanel
        class="absolute top-3 right-3 z-[101] w-1/5 h-[96%] text-center rounded-md opacity-90"
      />
      <!-- 画布 -->

      <div
        id="force-container"
        class="w-full h-full relative z-0 bg-white/[.03]"
      >
        <!-- <div class="bottom-0 left-0 right-0 top-0 absolute -z-[1] opacity-100">
          <div class="h-full w-full" style="color: rgb(247, 249, 255)" />
        </div> -->
        <div
          id="force-grid"
          class="bottom-0 left-0 right-0 top-0 absolute -z-[1]"
        >
          <svg class="h-full w-full">
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
            <rect class="w-full h-full" fill="url(#dots)" />
          </svg>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
// .kg-view {
//   position: relative;
//   margin: 10px;
// }

// .control-panel {
//   position: absolute;
//   top: 12px;
//   left: 12px;
//   z-index: 101; //防止覆盖
//   border-radius: 6px;
//   //background-color: rgb(255 255 255 / 80%); //设置透明度
//   opacity: 0.9;
// }

// .node-panel {
//   position: absolute;
//   top: 12px;
//   right: 12px;
//   z-index: 101; //防止覆盖//防止覆盖
//   width: 20%;
//   height: 96%;
//   text-align: center;
//   border-radius: 6px;
//   opacity: 0.9;
// }

// #node {
//   // .attr("stroke", "#fff")
//   //   .attr("stroke-width", 1.5)
//   stroke: #fff;
//   stroke-width: 1.5;
//   cursor: pointer;
// }

// #node:hover {
//   stroke-width: 5;
// }

// .nodeName {
//   fill: rgb(239, 1, 1);
// }
// .force-background {
//   bottom: 0;
//   left: 0;
//   position: absolute;
//   right: 0;
//   top: 0;
//   z-index: -1;
// }

// .force-background-area {
//   height: 100%;
//   width: 100%;
// }
// #force-grid {
//   bottom: 0;
//   left: 0;
//   position: absolute; //设置相对父组件漂浮
//   right: 0;
//   top: 0;
//   z-index: -1; //设置访问隐藏，控制层级顺序否则两者的鼠标事件会冲突
// }

// #force-container {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// }
</style>

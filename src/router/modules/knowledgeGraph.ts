export default {
  path: "/knowledgeGraph",
  redirect: "/knowledgeGraph/index",
  meta: {
    icon: "nodeIndex",
    title: "知识图谱",
    // showLink: false,
    rank: 2
  },
  children: [
    {
      path: "/knowledgeGraph/index",
      name: "NE",
      component: () => import("@/views/knowledgeGraph/index.vue"),
      meta: {
        title: "实体关系可视化"
      }
    },
    {
      path: "/knowledgeGraph/event",
      name: "EE",
      component: () => import("@/views/knowledgeGraph/event.vue"),
      meta: {
        title: "事件关系可视化"
      }
    }
  ]
} as RouteConfigsTable;

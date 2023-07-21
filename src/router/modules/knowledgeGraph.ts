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
      name: "KnowledgeGraph",
      component: () => import("@/views/knowledgeGraph/index.vue"),
      meta: {
        title: "知识图谱"
      }
    }
  ]
} as RouteConfigsTable;

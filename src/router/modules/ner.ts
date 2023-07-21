export default {
  path: "/ner",
  redirect: "/ner/index",
  meta: {
    icon: "ner",
    title: "实体命名识别",
    // showLink: false,
    rank: 3
  },
  children: [
    {
      path: "/ner/index",
      name: "NER",
      component: () => import("@/views/ner/index.vue"),
      meta: {
        title: "实体命名识别"
      }
    }
  ]
} as RouteConfigsTable;

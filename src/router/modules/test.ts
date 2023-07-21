export default {
  path: "/test",
  redirect: "/test/index",
  meta: {
    icon: "bug",
    title: "测试页面目录",
    // showLink: false,
    rank: 6
  },
  children: [
    {
      path: "/test/index",
      name: "Test",
      component: () => import("@/views/test/index.vue"),
      meta: {
        title: "测试页面",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;

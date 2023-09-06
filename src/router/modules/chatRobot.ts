export default {
  path: "/chatRobot",
  redirect: "/chatRobot/index",
  meta: {
    icon: "robot",
    title: "江湖百晓生",
    // showLink: false,
    rank: 1
  },
  children: [
    {
      path: "/chatRobot/index",
      name: "ChatRobot",
      component: () => import("@/views/chatRobot/index.vue"),
      meta: {
        title: "江湖百晓生"
      }
    }
  ]
} as RouteConfigsTable;

export default {
  path: "/chatRobot",
  redirect: "/chatRobot/index",
  meta: {
    icon: "robot",
    title: "聊天机器人",
    // showLink: false,
    rank: 1
  },
  children: [
    {
      path: "/chatRobot/index",
      name: "ChatRobot",
      component: () => import("@/views/chatRobot/index.vue"),
      meta: {
        title: "聊天机器人"
      }
    }
  ]
} as RouteConfigsTable;

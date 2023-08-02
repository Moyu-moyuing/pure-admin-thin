/*
 * @description: //模拟后端据接口，get、post请求数据
 * @fileName: kgDatas.ts
 * @author: Moyu-moyuing
 * @date: 2023-07-29 06:38:13
 */
import { MockMethod } from "vite-plugin-mock";
const list = {
  nodes: [
    { name: "李寻欢", type: "人物", group: 1 },
    { name: "林夫人", type: "人物", group: 2 },
    { name: "龙霸天", type: "人物", group: 3 }
  ],
  links: [
    { source: "李寻欢", target: "林夫人", relationship: "爱慕" },
    { source: "林夫人", target: "龙霸天", relationship: "爱慕" },
    { source: "李寻欢", target: "龙霸天", relationship: "结义" },
    { source: "龙霸天", target: "李寻欢", relationship: "结义" }
  ]
};

export default [
  {
    url: "/kg/all",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          kgDatas: list,
          nodeLength: list.nodes.length,
          linkLength: list.links.length
        }
      };
    }
  },
  {
    url: "/kg/name",
    method: "get",
    response: ({ query }) => {
      if (!list.nodes.find(item => item.name === query.name)) {
        return { success: false, data: {} };
      } else {
        const newLinks = list.links.filter(
          object => object.source === query.name || object.target === query.name
        );
        const newNodes = list.nodes.filter(object => {
          if (
            list.links.find(
              item => item.source === object.name || item.target === object.name
            )
          ) {
            return true;
          } else return false;
        });
        const newList = {
          nodes: newNodes,
          links: newLinks
        };
        return {
          success: true,
          data: {
            kgDatas: newList,
            nodeLength: newList.nodes.length,
            linkLength: newList.links.length
          }
        };
      }
    }
  }
] as MockMethod[];
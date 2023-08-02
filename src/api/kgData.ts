import { http } from "@/utils/http";

export type Node = {
  name: string;
  type: string;
  group: number;
};
export type Link = {
  source: string;
  target: string;
  relationship: string;
};
export type List = {
  nodes: Array<Node>;
  links: Array<Link>;
};
export type KgDataResult = {
  success: boolean;
  data: {
    /** Neo4j数据 */
    kgDatas: List;
    /** 当前登陆用户的角色 */
    nodeLength: number;
    /** `token` */
    linkLength: number;
  };
};

/** 查询所有 */
export const getAllDatas = () => {
  return http.request<KgDataResult>("get", "/kg/all");
};

/** 根据姓名查询 */
export const getDatasByName = (params?: object) => {
  return http.request<KgDataResult>("get", "/kg/name", { params });
};

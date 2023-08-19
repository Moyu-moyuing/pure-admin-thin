import { http } from "@/utils/http";

export type Node = {
  name: string;
  type: string;
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
export type allKgDataResult = {
  success: boolean;
  data: {
    /** Neo4j数据 */
    kgDatas: List;
    /** 节点数 */
    nodeLength: number;
    /** 链接数 */
    linkLength: number;
    /** 关系 */
    relations: Array<string>;
    /** 标签 */
    tags: string[];
  };
};
export type KgDataResult = {
  success: boolean;
  data: {
    /** Neo4j数据 */
    kgDatas: List;
    /** 节点数 */
    nodeLength: number;
    /** 链接数 */
    linkLength: number;
  };
};
/** 查询所有 */
export const getAllDatas = () => {
  return http.request<allKgDataResult>("get", "/kg/all");
};

/** 根据姓名查询 */
export const getDatasByName = (params?: object) => {
  return http.request<KgDataResult>("get", "/kg/name", { params });
};

/** 根据联系查询 */
export const getDatasByRelation = (params?: object) => {
  return http.request<KgDataResult>("get", "/kg/relations", { params });
};

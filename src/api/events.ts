import { http } from "@/utils/http";

type EventResult = {
  success: boolean;
  data?: Array<any>;
};

type EventResultTable = {
  success: boolean;
  data?: {
    list: Array<any>;
    total?: number;
    pageSize?: number;
    currentPage?: number;
  };
};

/** 获取所有事件 */
export const getAllEvents = async (): Promise<EventResult> => {
  return http.request<EventResult>("get", "/event/all");
};

/** 获取事件表，根据条件过滤 */
export const getEventsList = async (
  data?: object
): Promise<EventResultTable> => {
  return http.request<EventResultTable>("post", "/event/list", { data });
};

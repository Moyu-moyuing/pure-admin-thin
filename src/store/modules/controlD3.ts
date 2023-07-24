/*
 * @description: d3控制功能通信
 * @fileName: controlD3.ts
 * @author: Moyu-moyuing
 * @date: 2023-07-24 01:56:19
 */
import { defineStore } from "pinia";
import { store } from "@/store";
export const useControlD3Store = defineStore({
  id: "control-data",
  state: () => ({
    control: ""
  }),
  actions: {
    updateControl(newvalue: string): void {
      this.control = newvalue;
    }
  }
});

export function useControlD3StoreHook() {
  return useControlD3Store(store);
}

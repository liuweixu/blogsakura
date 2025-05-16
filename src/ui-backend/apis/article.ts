/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/ui-backend/utils";

//1. 获取频道列表
export function getChannelAPI() {
  //下面是创建请求配置
  return request({
    url: "/channels",
    method: "GET",
  });
}

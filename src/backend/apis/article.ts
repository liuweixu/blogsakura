/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/backend/utils";

//1. 获取频道列表
export function getChannelAPI() {
  //下面是创建请求配置
  return request({
    url: "/channels",
    method: "GET",
  });
}

export function createArticleAPI(data: {
  title: any;
  content: any;
  cover: { type: string; images: never[] };
  channel_id: any;
}) {
  return request({
    url: "/mp/articles",
    method: "POST",
    data,
  });
}

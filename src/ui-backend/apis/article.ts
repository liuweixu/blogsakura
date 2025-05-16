import { request } from "@/ui-backend/utils";

//1. 获取频道列表
export function getChannelAPI() {
  //下面是创建请求配置
  return request({
    url: "/api/backend/channels",
    method: "GET",
  });
}

//2. 添加文章
export function addArticleAPI(formData: {
  title: string;
  content: string;
  channel: string;
}) {
  return request({
    url: "/api/backend/article",
    method: "POST",
    data: formData,
  });
}

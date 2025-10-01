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
  image_type: string;
  image_url: string;
}) {
  return request({
    url: "/api/backend/article",
    method: "POST",
    data: formData,
  });
}

//3. 获取文章列表
export function getArticleListAPI() {
  return request({
    url: "/api/backend/articlelist",
    method: "GET",
  });
}

//4. 后台删除文章
export function delArticleAPI(id: string) {
  return request({
    url: `/api/backend/deletearticle/${id}`,
    method: "DELETE",
  });
}

//5. 获取id的文章
export function getArticleById(id: string) {
  return request({
    url: `/api/backend/articleget/${id}`,
    method: "GET",
  });
}

//6. 对id的文章删改（类似添加文章逻辑）
export function editArticleAPI(
  id: string,
  formData: {
    title: string;
    content: string;
    channel: string;
  }
) {
  return request({
    url: `/api/backend/articleput/${id}`,
    method: "PUT",
    data: formData,
  });
}

import axios from "axios";

export const getTestAPI = () => {
  // 使用相对路径，让Vite代理处理请求
  return axios.get("/api/test");
};

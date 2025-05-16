import axios from "axios";

export const getTestAPI = () => {
  // 使用相对路径，让Vite代理处理请求
  return axios.get("/api/test");
};

export const userTestAPI = () => {
  return axios.get("/api/users");
};

export const userTestPostAPI = (formData: { mobile: string; code: string }) => {
  console.log(formData);
  return axios.post("/api/users", formData);
};

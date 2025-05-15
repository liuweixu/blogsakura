//用户所有请求
import { request } from "@/backend/utils";
import type { FieldValues } from "react-hook-form";

//登录请求
export function loginAPI(formData: FieldValues) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

//获取用户信息
export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}

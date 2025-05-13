import { request } from "@/backend/utils";
import { useEffect } from "react";
//测试token是否成功注入
export const Layout = () => {
  useEffect(() => {
    request.get("/user/profile");
  }, []);
  return <div>this is layout</div>;
};

import type { ArticleContent } from "@/ui-backend/interface/Article";
import { getArticleById } from "@/ui-frontend/apis/article";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  const [data, setData] = useState<ArticleContent>();
  useEffect(() => {
    const getArticleContent = async () => {
      try {
        const res = await getArticleById(id);
        console.log(res.data.data); // 打印响应数据，以便检查是否正确获取了文章列表
        // 确保data是数组，否则使用空数组
        setData(res.data.data); // 注意这个，后台上因为添加拦截中，加上res.data，而这个是没加上，所以要多一个data
      } catch (error) {
        console.error("获取文章列表失败:", error);
      }
    };
    getArticleContent();
  }, [id]);
  return (
    //ArticleWrapper
    <div>
      <div className="pt-[75px] bg-[#fff] max-md:pt-[50px]" />
      {/**ArticleTop */}
      <div className="relative top-0 left-0 w-full overflow-hidden">
        <div className="bg-no-repeat bg-cover bg-[center_center] w-full h-[400px] bg-origin-border">
          <img
            className="w-full h-full object-cover pointer-events-none"
            src={"/statics/images/list_08.png"}
            alt=""
          />
        </div>
      </div>
      {data?.content}
      {data?.title}
      {data?.channel_name}
    </div>
  );
}

export default App;

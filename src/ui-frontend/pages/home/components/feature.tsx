import { Card } from "@/components/ui/card";
import type { ArticleItem } from "@/ui-backend/interface/Article";
import { getArticleHomeAPI } from "@/ui-frontend/apis/home";
import { useEffect, useState } from "react";
export function Feature() {
  const [data, setData] = useState<ArticleItem[]>([]);
  useEffect(() => {
    const getArticleList = async () => {
      try {
        const res = await getArticleHomeAPI();
        // 确保data是数组，否则使用空数组
        setData(res.data.data); // 注意这个，后台上因为添加拦截中，加上res.data，而这个是没加上，所以要多一个data
      } catch (error) {
        console.error("获取文章列表失败:", error);
      }
    };
    getArticleList();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((invoice) => (
        <Card key={invoice.id} className="hover:shadow-md transition-shadow">
          {invoice.title}
        </Card>
      ))}
    </div>
  );
}

import { Col, Row } from "antd";
import type { ArticleItem } from "@/ui-backend/interface/Article";
import { getArticleHomeAPI } from "@/ui-frontend/apis/home";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const features = data.slice(0, 3);

  return (
    <Row gutter={16} className="">
      {features.map((invoice) => (
        <Col key={invoice.id} xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="relative h-40 shadow-[1px_1px_3px_rgba(0,0,0,0.3)] overflow-hidden rounded-[10px]">
            {/**这部分先瞎改 */}
            <Link to={"/backend/articlelist"}>
              <div className="transition-all duration-300 ease-in-out scale-100 h-full hover:scale-[120]">
                <img
                  className="w-full h-full"
                  src="statics/images/list_02.png"
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/60 text-center opacity-0 invisible md:visible hover:opacity-100">
                <h3
                  className="group-hover:translate-x-0"
                  style={{
                    textTransform: "uppercase",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "16px",
                    padding: "10px",
                    background: "#111",
                    margin: "40px 0 0",
                    transition: "all 0.35s ease-in-out",
                    transform: "translateX(-100%)",
                  }}
                >
                  {invoice.title}
                </h3>
                <p
                  className="text-[12px] relative text-gray-400 p-[0_20px] text-center mt-[15px] h-[40px] leading-[20px] translate-x-full hover:translate-x-0"
                  style={{
                    transition: "all 0.35s 0.1s linear",
                  }}
                >
                  {invoice.content}
                </p>
              </div>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  );
}

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

  function featureList() {
    return (
      <Row gutter={16}>
        {features.map((invoice) => (
          <Col key={invoice.id} xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="relative h-40 shadow-[1px_3px_3px_rgba(0,0,0,0.3)] overflow-hidden rounded-2xl">
              <Link to={"/backend/articlelist"} className="h-full block group">
                <div className="transition-all duration-350 ease-in-out scale-100 h-full group-hover:scale-120">
                  <img
                    src="https://www.dmoe.cc/random.php"
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 text-center invisible backface-hidden bg-black/60 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-350 ease-in-out">
                  <h3 className="ellipsis uppercase text-white text-center text-[17px] p-2.5 bg-[#111]/80 m-[40px_0_0] transition-all duration-350 ease-in-out -translate-x-full group-hover:translate-x-0">
                    {invoice.title}
                  </h3>
                  <p className="ellipsis-two italic text-xs relative text-[#bbb] p-[0_20px] text-center transtion-all duration-300 ease-linear delay-100 translate-x-full mt-4 h-10 leading-5 group-hover:translate-x-0">
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

  return (
    <div>
      <div className="w-full h-auto mt-[55px] inline-block">
        <h1 className="text-[#666] text-[16px] font-bold mt-2.5 leading-6 pb-1.5 mb-8 border-b border-dashed border-[#ececec]">
          {/**TODO 这部分先待定 */}
          <i className="iconfont icon-anchor" />
          <span> START:DASH!!</span>
        </h1>
      </div>
      {featureList()}
    </div>
  );
}

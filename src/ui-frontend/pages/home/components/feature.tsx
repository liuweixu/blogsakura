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
      <Row gutter={16} className="top-feature-row">
        {/** 先放弃tailwindcss的撰写 */}
        {features.map((invoice) => (
          <Col key={invoice.id} xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="top-feature-item">
              {/**这部分先瞎改 */}
              <Link to={"/backend/articlelist"}>
                <div className="img-box">
                  <img src="statics/images/list_02.png" alt="" />
                </div>
                <div className="info">
                  <h3 className="ellipsis">{invoice.title}</h3>
                  <p className="ellipsis-two">{invoice.content}</p>
                </div>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div className="md:block hidden">
      <div className="w-full h-auto mt-[55px] inline-block md:mt-[15px]">
        <h1 className="text-[#666] text-[16px] font-bold mt-[10px] leading-6 pb-1.5 mb-8 md:mb-3.5 border-b border-dashed border-[#ececec">
          <i className="iconfont icon-anchor" />
          <span> START:DASH!!</span>
        </h1>
      </div>
      {featureList()}
    </div>
  );
}

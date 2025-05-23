import type { ArticleItem } from "@/ui-backend/interface/Article";
import { getArticleHomeAPI } from "@/ui-frontend/apis/home";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ListWrapper() {
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

  function listtest() {
    return (
      <div>
        {data.map((invoice, index) => {
          return (
            <div
              className="relative overflow-hidden my-12 rounded-2xl shadow-[0_1px_20px_-6px_rgba(0,0,0,0.5)] 
                         transition-shadow duration-300 ease-[ease] hover:shadow-[0_5px_10px_5px_rgba(110,110,110,0.4)] 
                         post-list-show"
              key={invoice.id}
            >
              <div>
                <div
                  className={`${
                    index % 2 === 0
                      ? "float-right w-[55%]"
                      : "float-left w-[55%]"
                  }`}
                >
                  <Link
                    to={"/backend/articlelist"}
                    className="relative h-75 block bg-no-repeat bg-cover overflow-hidden"
                  >
                    <img
                      className="h-full w-full object-cover transition-all duration-600 hover:scale-110 hover:rotate-3"
                      src={"/statics/images/list_05.png"}
                      alt=""
                    />
                  </Link>
                </div>
                <div
                  className={`relative inline-block w-2/5 mt-7.5 mr-2.5 mb-2.5 ${
                    index % 2 === 0
                      ? "float-right pr-8 pl-0 text-left"
                      : "float-left pl-8 pr-0 text-right"
                  }`}
                >
                  <div className="text-[#888] text-sm">
                    <i className="iconfont icon-time mr-1.5 text-[#989898] text-sm" />
                    发布于
                  </div>
                  <Link to={"/article/" + invoice.id} className="block my-4.5">
                    <h3 className="line-clamp-2 overflow-hidden break-words font-bold text-[#504e4e] transition-colors duration-200 ease-out hover:text-[#fe9600]">
                      {index}
                    </h3>
                  </Link>
                  {/**text-xs  12px  */}
                  <div className="text-[#888] text-xs">
                    <span>
                      <i className="iconfont icon-attention_light mr-1.5 text-[#989898] text-xs" />
                      热度
                    </span>
                    <span className="mx-2.5">
                      <i className="iconfont icon-icon_mark mr-1.5 text-[#989898] text-xs" />
                      评论
                    </span>
                    {invoice.channel_name && (
                      <span>
                        <i className="iconfont icon-icon_file mr-1.5 text-[#989898] text-xs" />
                        {invoice.channel_name}
                      </span>
                    )}
                  </div>
                  <div className="relative w-full my-2 z-50 text-black/66">
                    <p className="overflow-hidden my-5 leading-6 line-clamp-3">
                      测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                      测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                      测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </p>
                    <div>
                      <Link to={"/article/" + invoice.id}>
                        <i className="iconfont icon-icon_caidan text-[#666] hover:text-[#fe9600]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full h-auto mt-14 inline-block">
        <h1 className="text-[#666] font-bold mt-2.5 mb-7.5 border-b border-dashed border-[#ececec]">
          <i className="iconfont icon-envira" />
          <span> Discovery</span>
        </h1>
      </div>
      {listtest()}
    </div>
  );
}

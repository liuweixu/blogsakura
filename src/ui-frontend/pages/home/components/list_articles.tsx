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
      <div className="w-full">
        {data.map((invoice, index) => {
          return (
            <div
              className="w-full h-[300px] relative m-[30px_0] rounded-[10px] shadow-[0_1px_20px_-6px_rgba(0,0,0,0.5)] opacity-0 transition-shadow duration-300 ease-[ease] hover:shadow-[0_5px_10px_5px_rgba(110,110,110,0.4)] post-list-show"
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
                    className="h-75 relative block bg-no-repeat bg-cover overflow-hidden rounded-[10px]"
                  >
                    <img
                      className="w-full h-full object-cover transition-all duration-600 filter-none pointer-none hover:scale-110 hover:rotate-3"
                      src={"/statics/images/list_01.png"}
                      alt=""
                    />
                  </Link>
                </div>
                <div
                  className={`relative inline-block w-2/5 m-[30px_10px_10px_0] ${
                    index % 2 === 0
                      ? "float-right pr-8 pl-0 text-left"
                      : "float-left pl-8 pr-0 text-right"
                  }`}
                >
                  <div className="text-[#888] text-[14px]">
                    <i className="iconfont icon-time mr-[5px] text-[#989898] text-[14px]" />
                    发布于
                  </div>
                  <Link
                    to={"/article/" + invoice.id}
                    className="block my-[18px]"
                  >
                    <h3 className="text-ellipsis line-clamp-2 overflow-hidden break-words text-[16px] font-bold text-[#504e4e] transition-colors duration-200 ease-out hover:text-[#fe9600]">
                      {index}
                    </h3>
                  </Link>
                  <div className="text-[#888] text-[14px]">
                    <span>
                      <i className="iconfont icon-attention_light mr-[5px] text-[#989898] text-[14px]" />
                      热度
                    </span>
                    <span className="mx-[10px]">
                      <i className="iconfont icon-icon_mark mr-[5px] text-[#989898] text-[14px]" />
                      评论
                    </span>
                    {invoice.channel_name && (
                      <span>
                        <i className="iconfont icon-icon_file mr-[5px] text-[#989898] text-[14px]" />
                        {invoice.channel_name}
                      </span>
                    )}
                  </div>
                  <div className="relative w-full right-0 my-0 p-0 z-50 text-[rgba(0,0,0,0.66)]">
                    <p className="line-clamp-3 h-[69px] overflow-hidden my-[16px_0_22px_0] text-[15px] text-[rgba(0,0,0,0.66)] leading-[23px]">
                      {invoice.content}
                      {invoice.id}
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
      <div className="w-full h-auto mt-[55px] inline-block">
        <h1 className="text-[#666] text-[16px] font-bold mt-2.5 leading-6 pb-[5px] mb-[30px] border-b border-dashed border-[#ececec]">
          <i className="iconfont icon-envira" />
          <span> Discovery</span>
        </h1>
      </div>
      {listtest()}
    </div>
  );
}

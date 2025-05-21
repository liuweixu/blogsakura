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
        console.log(res.data.data); // 打印响应数据，以便检查是否正确获取了文章列表
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
                    className={`h-[300px] relative block bg-no-repeat bg-cover overflow-hidden  ${
                      index % 2 === 0
                        ? "rounded-[0_10px_10px_0]"
                        : "rounded-[10px_0_0_10px]"
                    }`}
                  >
                    <img
                      className="w-full h-full object-cover transition-all duration-600 filter-none pointer-none hover:scale-110"
                      src={"statics/images/list_02.png"}
                      alt=""
                    />
                  </Link>
                </div>
                <div
                  className={`relative inline-block w-2/5 ${
                    index % 2 === 0
                      ? "float-right pr-8 pl-0 m-[30px_10px_0]"
                      : "float-left pl-8 pr-0 text-right m-[30px_10px_10px_0]"
                  }`}
                >
                  <div className="text-[#888] text-[14px]">
                    {/**TODO 往后处理徽章一事 */}
                    <i className="iconfont icon-time mr-[5px] text-[#989898] text-[14px]" />
                    发布于
                  </div>
                  <Link to={"/backend/articlelist"} className="block my-[18px]">
                    <h3 className="text-ellipsis line-clamp-2 overflow-hidden break-words text-[16px] font-bold text-[#504e4e] transition-colors duration-200 ease-out hover:text-[#fe9600]">
                      {index}
                    </h3>
                  </Link>
                  <div className="text-[#888] text-[14px]">
                    <span>
                      {/**TODO 往后处理徽章一事 */}
                      <i className="iconfont icon-attention mr-[5px] text-[#989898] text-[14px]" />
                      热度
                    </span>
                    <span className="mx-[10px]">
                      {/**TODO 往后处理徽章一事 */}
                      <i className="iconfont icon-mark mr-[5px] text-[#989898] text-[14px]" />
                      评论
                    </span>
                    {invoice.channel_name && (
                      <span>
                        {/**TODO 往后处理徽章一事 */}
                        <i className="iconfont icon-file mr-[5px] text-[#989898] text-[14px]" />
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
                      <Link to={"/backend/articlelist"}>
                        {/**TODO 往后处理徽章一事 */}
                        <i className="iconfont icon-caidan text-[25px] text-[#666] hover:text-[#fe9600]" />
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
  return <div className="w-full">{listtest()}</div>;
}

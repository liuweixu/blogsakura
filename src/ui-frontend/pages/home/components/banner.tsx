/**注意事项：

1. 由于Tailwind CSS不支持动态值，一些样式（如背景图片）仍然需要使用内联样式或CSS变量
2. 复杂的动画效果（如波浪动画）需要使用自定义CSS定义
3. 响应式设计可以使用Tailwind的响应式前缀（如md:hidden）
4. 一些特殊效果（如glitch效果）仍然需要保留自定义CSS 
//   transformOrigin: "center bottom", // 用origin-[center_bottom]代替
//   backgroundPosition: "0 bottom", // 用bg-left-bottom代替
*/
export const Banner = () => {
  return (
    <div className="relative overflow-hidden h-auto before:content-[''] before:absolute before:inset-0 before:z-[3] before:bg-fixed before:bg-[url('statics/images/grid.png')]">
      {/**注意上面要加入before选择器，让grid这个模糊图片盖上原来图片，从而形成新样式的背景图 */}
      {/**三条波浪 */}
      <div className="absolute overflow-hidden inset-0 m-auto">
        <div className="absolute w-full overflow-hidden h-full bottom-[-1px] z-[15] opacity-50">
          <div
            className="absolute left-0 w-[200%] h-full bg-repeat-x bg-left-bottom origin-[center_bottom]"
            style={{
              backgroundImage: "url('statics/images/wave-top.png')",
              backgroundSize: "50% 100px",
            }}
          />
        </div>
        <div className="absolute w-full overflow-hidden h-full bottom-[-1px] z-[10] opacity-75">
          <div
            className="absolute left-0 w-[200%] h-full bg-repeat-x bg-left-bottom origin-[center_bottom]"
            style={{
              backgroundImage: "url('statics/images/wave-mid.png')",
              backgroundSize: "50% 120px",
              animation: "move_wave 10s linear infinite",
            }}
          />
        </div>
        <div className="absolute w-full overflow-hidden h-full bottom-[-1px] z-[5]">
          <div
            className="absolute left-0 w-[200%] h-full bg-repeat-x bg-left-bottom origin-[center_bottom]"
            style={{
              backgroundImage: "url('statics/images/wave-bot.png')",
              backgroundSize: "50% 100px",
              animation: "move_wave 15s linear infinite",
            }}
          />
        </div>
      </div>
      {/**TODO 顶部向下动画 尚未添加事件 待定 */}
      {/* Scroll down button */}
      <div className=""></div>
      {/**内容模块 Center Content */}
      <div
        className="w-full h-[550px] m-0 p-0 bg-[top_center] bg-no-repeat bg-fixed bg-cover z-[-1]"
        style={{
          backgroundImage: "url('statics/images/timg-3.png')",
          height: innerHeight + "px",
        }}
      >
        {/**Focusinfo */}
        <div
          className="relative max-w-[800px] px-[10px] top-[49.3%] left-1/2 text-center z-[99]"
          style={{
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)",
            WebkitTransition: ".4s ease all",
            MozTransition: ".4s ease all",
            OTransition: ".4s ease all",
            transition: ".4s ease all",
          }}
        >
          <h1 className="glitch" data-text="您好">
            您好
          </h1>
          <div className="relative w-[63%] m-auto text-[16px] text-[#eaeadf] bg-[rgba(0,0,0,0.5)] p-[15px] mt-[22px] leading-8 rounded-[10px] whitespace-nowrap box-content">
            <p className="m-0 font-bold">
              <i className="iconfont icon-quote-left" />
              <span>
                {"You got to put the past behind you before you can move on."}
              </span>
              <i className="iconfont icon-quoteright" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

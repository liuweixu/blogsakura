import { WaveAnimation } from "@/ui-frontend/common/WaveAnimation";

export const Banner = () => {
  return (
    <div className="before:content-[''] before:absolute before:inset-0 before:z-[3] before:bg-fixed before:bg-[url('statics/images/grid.png')]">
      <div className="relative overflow-hidden h-auto">
        {/**注意上面要加入before选择器，让grid这个模糊图片盖上原来图片，从而形成新样式的背景图 */}
        {/**三条波浪 */}
        <div className="absolute overflow-hidden inset-0 m-auto">
          <WaveAnimation
            zIndex="z-[10]"
            opacity={50}
            imageUrl="statics/images/wave-top.png"
            waveWidth="50%"
            waveHeight="100px"
            animationDuration=""
          />
          <WaveAnimation
            zIndex="z-[15]"
            opacity={70}
            imageUrl="statics/images/wave-mid.png"
            waveWidth="50%"
            waveHeight="120px"
            animationDuration="15s linear infinite"
          />
          <WaveAnimation
            zIndex="z-[20]"
            opacity={80}
            imageUrl="statics/images/wave-bot.png"
            waveWidth="50%"
            waveHeight="100px"
            animationDuration="25s linear infinite"
          />
        </div>

        {/**TODO 顶部向下动画 尚未添加事件 待定 */}
        {/* Scroll down button */}
        <div className=""></div>
        {/**内容模块 Center Content*/}
        <div className="w-full h-screen  bg-[top_center] bg-no-repeat bg-fixed bg-cover z-[-1] bg-[url('statics/images/timg-3.png')]">
          {/**Focusinfo */}
          <div className="relative max-w-[800px] px-[0_10px] top-[49.3%] left-1/2 -translate-1/2 text-center z-[99] transition-all duration-400 ease-in-out md:block hidden">
            <h1 className="glitch" data-text="您好">
              您好
            </h1>
            {/**对您好下面的黑色方框（带有箭头）绘制 */}
            <div className="before:content-[''] before:absolute before:top-[-30px] before:left-1/2 before:ml-[-10px] before:border-[15px] before:border-solid before:border-transparent before:border-b-black/50">
              <div className="relative w-[63%] m-auto text-[16px] text-[#eaeadf] bg-[rgba(0,0,0,0.5)] p-[15px] mt-[22px] leading-[30px] rounded-[10px] box-content whitespace-nowrap">
                <p
                  className="m-0 font-bold"
                  style={{
                    fontFamily: "Ubuntu, sans-serif",
                  }}
                >
                  <span className="mx-[10px] my-0">
                    {
                      "You got to put the past behind you before you can move on."
                    }
                  </span>
                </p>
                {/**这部分待定 */}
                <div className="h-[35px] mb-[-10px] list-none inline-block">
                  <li className="relative h-[35px] float-left m-[0_6px] cursor-[url('statics/images/ayuda.cur')_auto]">
                    <img
                      className="h-[35px] w-[35px] p-[6px] bg-[0_0]"
                      style={{
                        MozTransform: "scaleX(-1)",
                        WebkitTransform: "scaleX(-1)",
                        OTransform: "scaleX(-1)",
                        transform: "scaleX(-1)",
                        filter: "FlipH",
                      }}
                      src="statics/images/next-b.svg"
                      alt=""
                    />
                  </li>
                  <li className="relative h-[35px] float-left m-[0_6px] cursor-[url('statics/images/ayuda.cur')_auto]">
                    <img
                      className="h-[35px] w-[35px] p-[6px] bg-[0_0]"
                      src="statics/images/next-b.svg"
                      alt=""
                    />
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

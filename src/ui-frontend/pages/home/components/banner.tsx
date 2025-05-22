import { WaveAnimation } from "@/ui-frontend/common/WaveAnimation";

export const Banner = () => {
  return (
    //{/**注意上面要加入before选择器，让grid这个模糊图片盖上原来图片，从而形成新样式的背景图 */}
    <div
      className="relative overflow-hidden h-auto before:content-[''] before:absolute before:inset-0 before:z-[3] before:bg-fixed 
      before:bg-[url('statics/images/grid.png')]"
    >
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
      <div
        className="w-full h-screen bg-center-top bg-fixed bg-no-repeat bg-cover -z-10
          bg-[url('https://api.mtyqx.cn/api/random.php')]"
      >
        {/**Focusinfo */}
        <div
          className="relative max-w-[800px] p-2.5 top-1/2 left-1/2 -translate-1/2 text-center
           z-100 transition-all duration-400 ease-in-out md:block hidden"
        >
          <h1 className="glitch" data-text="您好">
            您好
          </h1>
          {/**对您好下面的黑色方框（带有箭头）绘制 */}
          <div
            className="relative w-[63%] m-auto text-[16px] text-[#eaeadf] bg-black/50
              p-[15px] mt-[22px] leading-7.5 rounded-2xl box-content whitespace-nowrap before:content-['']
              before:absolute before:top-[-30px] before:left-1/2 before:ml-[-10px] before:border-[15px] 
              before:border-solid before:border-transparent before:border-b-black/50"
          >
            <p className="font-bold">
              <span className="mx-[10px]">
                {"You got to put the past behind you before you can move on."}
              </span>
            </p>
            {/**这部分 初步完成，剩下就是添加事件和应用 */}
            <div className="h-[35px] mb-[-10px] list-none inline-block">
              <li className="relative h-[35px] float-left m-[0_6px]">
                <img
                  className="h-[35px] w-[35px] p-[6px] bg-[0_0] -scale-100"
                  src="/statics/images/next-b.svg"
                  alt=""
                />
              </li>
              <li className="relative h-[35px] float-left m-[0_6px]">
                <img
                  className="h-[35px] w-[35px] p-[6px] bg-[0_0]"
                  src="/statics/images/next-b.svg"
                  alt=""
                />
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

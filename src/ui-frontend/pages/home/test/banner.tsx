import React, { PureComponent } from "react";

class Banner extends PureComponent {
  render() {
    return (
      <div className="relative overflow-hidden h-auto">
        {/* Wave animation */}
        <div className="waveWrapper waveAnimation absolute inset-0 overflow-hidden">
          <div className="waveWrapperInner bgTop absolute w-full h-full bottom-[-1px] opacity-50 z-[15]">
            <div
              className="wave waveTop absolute left-0 w-[200%] h-full bg-repeat-x bg-[0_bottom] origin-[center_bottom]"
              style={{ backgroundImage: "url('/statics/images/wave-top.png')" }}
            />
          </div>
          <div className="waveWrapperInner bgMiddle absolute w-full h-full bottom-[-1px] opacity-75 z-[10]">
            <div
              className="wave waveMiddle absolute left-0 w-[200%] h-full bg-repeat-x bg-[0_bottom] origin-[center_bottom]"
              style={{ backgroundImage: "url('/statics/images/wave-mid.png')" }}
            />
          </div>
          <div className="waveWrapperInner bgBottom absolute w-full h-full bottom-[-1px] z-[5]">
            <div
              className="wave waveBottom absolute left-0 w-[200%] h-full bg-repeat-x bg-[0_bottom] origin-[center_bottom]"
              style={{ backgroundImage: "url('/statics/images/wave-bot.png')" }}
            />
          </div>
        </div>

        <div className="headertop-down absolute bottom-[80px] left-1/2 z-[90] cursor-pointer animate-[float_2s_linear_infinite]">
          {/* <span onClick={headertop_down}> */}
          <span>
            <i className="iconfont icon-chevrondown text-[32px] text-white scale-x-[1.5]" />
          </span>
        </div>

        <div
          className="w-full h-[550px] m-0 p-0 bg-top bg-no-repeat bg-fixed bg-cover z-[-1]"
          style={{ backgroundImage: "initial", height: `${innerHeight}px` }}
        >
          <div className="focusinfo relative max-w-[800px] px-[10px] top-[49.3%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[99] transition-all duration-400">
            <h1 className="glitch font-['Ubuntu'] text-[60px] text-white mb-[30px]">
              Helloblog!
            </h1>

            <div className="header-info">
              <p className="text-ellipsis overflow-hidden whitespace-nowrap text-white">
                <i className="iconfont icon-quote-left" />
                <span>
                  {"You got to put the past behind you before you can move on."}
                </span>
                <i className="iconfont icon-quoteright" />
              </p>

              <div className="top-social_v2 flex justify-center mt-[20px]">
                <li className="cursor-pointer">
                  <img
                    className="flipx w-[30px] h-[30px]"
                    src="/statics/images/next-b.svg"
                    alt=""
                  />
                </li>

                <li className="cursor-pointer">
                  <img
                    src="/statics/images/next-b.svg"
                    alt=""
                    className="w-[30px] h-[30px]"
                  />
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;

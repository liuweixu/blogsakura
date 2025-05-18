export const Banner = () => {
  return (
    <div
      className="waveWrapper waveAnimation absolute inset-0 overflow-hidden"
      style={{ border: "1px solid red" }}
    >
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
  );
};

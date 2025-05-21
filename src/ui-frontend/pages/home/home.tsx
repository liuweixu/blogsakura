import { Banner } from "./components/banner";
import { Feature } from "./components/feature";
import { ListWrapper } from "./components/list";
function App() {
  // useEffect(() => {
  //   // 动态创建script标签
  //   const script = document.createElement("script");
  //   script.src = "https://api.wukeke.top/huang.js";
  //   script.setAttribute("zIndex", "-90");
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     // 组件卸载时移除（可选）
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="w-full">
      <Banner />
      {/**MainWrapper */}
      <div
        className="w-full max-w-[900px] p-[0_10px] ml-auto mr-auto bg-white/80"
        id="content"
        style={{
          animation: "main 1s",
        }}
      >
        <Feature />
        <ListWrapper />
      </div>
    </div>
  );
}

export default App;

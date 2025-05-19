import { Banner } from "./components/banner";
import { Feature } from "./components/feature";
function App() {
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
      </div>
    </div>
  );
}

export default App;

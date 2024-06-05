import { useState } from "react";

function RightContainer() {
  const [clicked, setclicked] = useState("단기 투자");
  const investType = ["단기 투자", "장기 투자"];
  return (
    <div className="w-1/3 flex gap-4 flex-col">
      <div className="text-white text-3xl font-bold text-start">모의 투자</div>
      <div>
        <div className="flex gap-2">
          {investType.map((type, index) => {
            return (
              <button
                key={index}
                className={` text-white px-4 py-1 w-fit ${
                  clicked === type
                    ? "bg-opacity-40 bg-[#545354] slate-400 border-t-2 border-[#006DE9] "
                    : "bg-black"
                }`}
                onClick={() => setclicked(type)}
              >
                {type}
              </button>
            );
          })}
        </div>
        <div className=" bg-[#545354] bg-opacity-40 min-h-screen">
          <div className="text-start w-fit flex flex-col px-14">
            <div className=" font-semibold text-[#9D9D9D] text-xl">
              매수할 날짜
            </div>
            <div className=" font-semibold text-[#9D9D9D] text-xl">
              매도할 날짜
            </div>
            <div className=" font-semibold text-[#9D9D9D] text-xl">수수료</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightContainer;

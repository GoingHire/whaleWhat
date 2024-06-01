import { useState } from "react";

function RightContainer() {
  const [clicked, setclicked] = useState("단기 투자");
  const investType = ["단기 투자", "장기 투자"];
  return (
    <div className="w-1/3 flex gap-4 flex-col">
      <div className="text-white text-3xl font-bold">모의 투자</div>
      <div className="flex gap-2">
        {investType.map((type, index) => {
          return (
            <button
              key={index}
              className={`bg-opacity-40 bg-slate-400 text-white px-4 py-1 w-fit ${
                clicked === type ? "bg-opacity-40 bg-slate-400" : "bg-black"
              }`}
              onClick={() => setclicked(type)}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RightContainer;

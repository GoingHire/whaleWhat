import axios from "axios";
import { useState } from "react";
import DateRangePicker from "../../../components/DateRangePicker";

function RightContainer() {
  const [clicked, setclicked] = useState("단기 투자");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const investType = ["단기 투자", "장기 투자"];
  const coinTypes = ["BTC", "ETH"];

  const getUpbitPrice = async (market, date) => {
    try {
      const response = axios.get(
        `https://api.upbit.com/v1/candles/days?market=${market}&count=1&to=${date}T00:00:00Z`
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDateRange = (dateRange) => {
    console.log(dateRange);
    setStartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
  };
  const commonInputStyle =
    "justify-center px-4 py-3.5 text-sm font-Pretendard_Medium leading-5.5 rounded-xl bg-neutral-50 text-black";

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
            <div className="grid gap-2">
              <div className=" font-semibold text-[#9D9D9D] text-2xl">
                투자할 코인의 종류
              </div>
              <div className="flex gap-4">
                {coinTypes.map((coinType, index) => {
                  return (
                    <button key={index} className="text-white">
                      {coinType}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className=" font-semibold text-[#9D9D9D] text-2xl">
                매수 기간
              </div>

              <DateRangePicker
                onChange={handleDateRange}
                inputClassName={`w-full flex ${commonInputStyle}`}
                useMinDate={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightContainer;

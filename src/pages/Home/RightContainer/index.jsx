import axios from "axios";
import { useMemo, useState } from "react";
import DateRangePicker from "../../../components/DateRangePicker";
import Modal from "../../../components/Modal";

function RightContainer() {
  const [clicked, setclicked] = useState("단기 투자");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [coinType, setCoinType] = useState("BTC");
  const [coinNum, setCoinNum] = useState();
  const [startPrice, setStartPrice] = useState();
  const [endPrice, setEndPrice] = useState();
  const [isShow, setIsShow] = useState(false);
  const investType = ["단기 투자", "장기 투자"];
  const coinTypes = ["BTC", "ETH"];

  const getUpbitPrice = async (market, date) => {
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/candles/days?market=${market}&to=${date}T00:00:00Z&count=1`
      );
      return response.data[0].trade_price;
    } catch (e) {
      console.log(e);
    }
  };
  const handleDateRange = (dateRange) => {
    console.log(dateRange);
    setStartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
  };

  const market = useMemo(() => (coinType === "BTC" ? "KRW-BTC" : "KRW-ETH"));

  const handleInvestBtn = async () => {
    try {
      const buy = await getUpbitPrice(market, startDate);
      const sell = await getUpbitPrice(market, endDate);
      setStartPrice(buy);
      setEndPrice(sell);
      setIsShow(true);
    } catch (e) {
      console.log(e);
    }
  };

  const result = useMemo(() => {
    console.log(startPrice, endPrice, coinNum);
    return (endPrice - startPrice) * coinNum;
  }, [coinType, coinNum]);

  console.log(result);
  const commonInputStyle =
    "justify-center px-4 py-3.5 text-sm bg-[#545354] leading-5.5 rounded-xl text-white";

  return (
    <div className="w-1/3 flex gap-4 flex-col">
      <div className="text-white text-4xl font-bold text-start">모의 투자</div>
      <div>
        <div className=" border-t-2 border-main bg-[#545354] bg-opacity-40 min-h-screen">
          <div className="text-start w-fit flex flex-col px-14 gap-4">
            <div className="grid gap-2">
              <div className="flex gap-4 pt-4">
                {coinTypes.map((coin, index) => {
                  return (
                    <button
                      key={index}
                      className={` text-3xl font-bold ${
                        coinType === coin ? " opacity-60 text-main" : ""
                      }`}
                      onClick={() => setCoinType(coin)}
                    >
                      {coin}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-2">
              <div className=" text-[#9D9D9D] text-xl">투자 기간</div>

              <DateRangePicker
                onChange={handleDateRange}
                inputClassName={`w-full flex ${commonInputStyle}`}
                useMinDate={false}
              />
            </div>
            <div className="grid gap-2">
              <div className="text-[#9D9D9D] text-xl">투자할 코인 수</div>
              <input
                className="bg-[#545354] rounded-xl text-white px-4 py-3.5 placeholder:text-white"
                placeholder="ex) 1"
                type="number"
                onChange={(e) => setCoinNum(e.target.value)}
              />
            </div>
            <button
              className="text-white hover:text-main"
              onClick={() => handleInvestBtn()}
            >
              투자하기
            </button>
          </div>
        </div>
      </div>
      <Modal show={isShow} size="sm" onClose={() => setIsShow(false)}>
        <div className="text-center flex justify-center">
          <div className=" font-pretendard font-bold">수익금</div>
          <div className="flex font-pretendard gap">
            <div> {result} 원</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RightContainer;

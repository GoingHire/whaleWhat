import { useCallback, useMemo, useState } from "react";
import DropDown from "../../../components/DropDown/index.jsx";
import Datepicker from "react-tailwindcss-datepicker";

function RightContainer() {
  const [coinType, setCoinType] = useState("BTC");
  const [startDate, setStartDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [tokenNum, setTokenNum] = useState(1);
  const [priceGap, setPriceGap] = useState(null);
  const [message, setMessage] = useState("");

  const makeMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // memo
  const marketString = useMemo(
    () => (coinType === "BTC" ? "KRW-BTC" : "KRW-ETH"),
    [coinType]
  );

  // handler
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleSelect = (option) => {
    setCoinType(option);
  };

  const handleChangeTokenNum = useCallback((e) => {
    const value = e.target.value;
    setTokenNum(value < 1 ? 1 : value);
  }, []);

  // callback
  const handleClickSimulate = useCallback(() => {
    const fetchUpbitPriceGap = async (market, date) => {
      try {
        const startDatePrice = await fetch(
          `https://api.upbit.com/v1/candles/days?market=${market}&to=${date.startDate}T00:00:00&count=1`
        )
          .then((response) => response.json())
          .then((response) => response[0].trade_price)
          .catch((error) => console.error("Error fetching:", error));

        const endDatePrice = await fetch(
          `https://api.upbit.com/v1/candles/days?market=${market}&to=${date.endDate}T00:00:00&count=1`
        )
          .then((response) => response.json())
          .then((response) => response[0].trade_price)
          .catch((error) => console.error("Error fetching:", error));

        setPriceGap((endDatePrice - startDatePrice) * tokenNum);
      } catch (e) {
        console.log(e);
      }
    };

    if (startDate.startDate && endDate.startDate) {
      const date = {
        startDate: startDate.startDate,
        endDate: endDate.startDate,
      };
      const [startYear, startMonth, startDay] = date.startDate
        .split("-")
        .map(Number);
      const formattedStartDate = new Date(startYear, startMonth - 1, startDay);
      const [endYear, endMonth, endDay] = date.endDate.split("-").map(Number);
      const formattedEndDate = new Date(endYear, endMonth - 1, endDay);
      const today = new Date();
      const isPast =
        formattedStartDate < today &&
        formattedEndDate < today &&
        formattedStartDate < formattedEndDate;

      if (isPast) {
        fetchUpbitPriceGap(marketString, date);
      } else {
        makeMessage("유효한 매수 / 매도 날짜를 선택해주세요!");
      }
    } else {
      makeMessage("유효한 매수 / 매도 날짜를 선택해주세요!");
    }
  }, [startDate.startDate, endDate.startDate, tokenNum, marketString]);

  return (
    <div className="w-1/3 flex gap-4 flex-col">
      <div className="text-white text-3xl font-bold text-start">모의 투자</div>
      <div className="bg-[#545354] bg-opacity-40 min-h-screen">
        <div className="text-start flex flex-col px-14">
          <div className="mt-6 mb-2 font-semibold text-[#9D9D9D] text-xl">
            투자할 코인의 종류
          </div>
          <DropDown
            options={["BTC", "ETH"]}
            onSelect={handleSelect}
            className="hover:cursor-pointer"
          />
          <div className="mt-6 mb-2 font-semibold text-[#9D9D9D] text-xl">
            매수 날짜 선택
          </div>
          <Datepicker
            primaryColor={"#006EEB"}
            asSingle={true}
            useRange={false}
            value={startDate}
            onChange={handleStartDateChange}
            maxDate={new Date()}
          />
          <div className="mt-6 mb-2 font-semibold text-[#9D9D9D] text-xl">
            메도 날짜 선택
          </div>
          <Datepicker
            primaryColor={"#006EEB"}
            asSingle={true}
            useRange={false}
            value={endDate}
            maxDate={new Date()}
            onChange={handleEndDateChange}
          />
          <div className="mt-6 mb-2 font-semibold text-[#9D9D9D] text-xl">
            개수
          </div>
          <input
            value={tokenNum}
            type="number"
            onChange={handleChangeTokenNum}
            className="p-1 rounded-lg h-10"
          />
          <button
            onClick={handleClickSimulate}
            className="mt-6 rounded-lg text-white h-10 bg-[#006EEB]"
          >
            모의 투자
          </button>
        </div>
        <div className="mt-6">
          {priceGap && (
            <div>
              <p className=" text-slate-300">당신의 수익금은</p>
              <p className="text-white text-2xl">
                {priceGap.toLocaleString("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                })}
              </p>
            </div>
          )}
          {message && (
            <div>
              <p className="text-red-400 text-xl">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightContainer;

import React, { useState } from "react";
import DropDown from "../../../components/DropDown";
import ChartComponent from "../../../components/Chart";
function LeftContainer() {
  const [coinType, setCoinType] = useState("BTC");
  const [selected, setSelected] = useState("1W");
  const handleSelect = (option, index) => {
    setCoinType(option);
  };
  const onClickHandler = (date) => {
    console.log(date);
    setSelected(date);
  };
  const dateSelecter = ["1W", "1M"];

  return (
    <div>
      <div className="flex flex-col gap-4 pl-28 pt-10">
        <DropDown
          options={["BTC", "ETH"]}
          onSelect={handleSelect}
          className="hover:cursor-pointer"
        />
        <div className="flex gap-4 text-lg">
          {dateSelecter.map((date, index) => {
            return (
              <button
                key={index}
                className={`text-white hover:text-[#006EEB] ${
                  selected === date ? "text-[#006EEB]" : null
                }`}
                onClick={() => onClickHandler(dateSelecter[index])}
              >
                {date}
              </button>
            );
          })}
        </div>
        {coinType === "BTC" ? (
          <ChartComponent
            market="KRW-BTC"
            unit={selected === "1W" ? "weeks" : "months"}
            count={65}
            containerId="bitcoinChartContainer"
            titleText={
              selected === "1W"
                ? "Bitcoin Weekly Candle Chart"
                : "BitCoin Monthly Candle Chart"
            }
          />
        ) : (
          <ChartComponent
            market="KRW-ETH"
            unit={selected === "1W" ? "weeks" : "months"}
            count={65}
            containerId="ethereumChartContainer2"
            titleText={
              selected === "1W"
                ? "Ethereum Weekly Candle Chart"
                : "Ethereum Monthly Candle Chart"
            }
          />
        )}
      </div>
    </div>
  );
}

export default LeftContainer;

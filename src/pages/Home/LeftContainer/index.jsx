import React, { useState, useEffect } from "react";
import DropDown from "../../../components/DropDown";
import ChartComponent from "../../../components/Chart";
function LeftContainer() {
  const [coinType, setCoinType] = useState("BTC");
  const [selected, setSelected] = useState("1W");
  const [selectedChartType, setSelectedChartType] = useState("candlestick");
  const handleSelect = (option, index) => {
    setCoinType(option);
  };
  const onClickHandler = (date) => {
    console.log("clicked", date);
    setSelected(date);
  };
  const dateSelecter = ["1D", "1W", "1M"];

  const chartTypeSelecter = [
    { id: "candle", name: "candlestick" },
    { id: "line", name: "line" },
  ];

  useEffect(() => {
    console.log("uEF", selected === dateSelecter[0]);
    console.log("uEF2", dateSelecter[0]);
  }, [selected]);

  const onClickTypeSelecter = (chartType) => {
    setSelectedChartType(chartType.name);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 pl-28 pt-10">
        <DropDown
          options={["BTC", "ETH"]}
          onSelect={handleSelect}
          className="hover:cursor-pointer"
        />
        <div className="flex flex-col gap-4 text-lg">
          <div className=" flex gap-4">
            {dateSelecter.map((date, index) => {
              return (
                <button
                  key={index}
                  className={` hover:text-[#006EEB] ${
                    selected === date ? "text-[#006EEB]" : "text-white"
                  }`}
                  onClick={() => onClickHandler(date)}
                >
                  {date}
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 font-pretendard">
            {chartTypeSelecter.map((chartType, index) => {
              return (
                <button
                  key={index}
                  className={` hover:text-[#006EEB] ${
                    selectedChartType === chartType.name
                      ? "text-[#006EEB]"
                      : "text-white"
                  }`}
                  onClick={() => onClickTypeSelecter(chartType)}
                >
                  {chartType.id}
                </button>
              );
            })}
          </div>
          ;
        </div>
        {coinType === "BTC" ? (
          <ChartComponent
            market="KRW-BTC"
            unit={
              selected === "1W"
                ? "weeks"
                : selected === "1D"
                ? "days"
                : "months"
            }
            count={65}
            chartType={selectedChartType}
            containerId="bitcoinChartContainer"
            titleText={
              selected === "1W"
                ? `Bitcoin Weekly ${selectedChartType} Chart`
                : selected === "1D"
                ? `BitCoin Daily ${selectedChartType} Chart`
                : `BitCoin Monthly ${selectedChartType} Chart`
            }
          />
        ) : (
          <ChartComponent
            market="KRW-ETH"
            unit={
              selected === "1W"
                ? "weeks"
                : selected === "1D"
                ? "days"
                : "months"
            }
            count={65}
            chartType={selectedChartType}
            containerId="ethereumChartContainer2"
            titleText={
              selected === "1W"
                ? `Ethereum Weekly ${selectedChartType} Chart`
                : selected === "1D"
                ? `Ethereum Daily ${selectedChartType} Chart`
                : `Ethereum Monthly ${selectedChartType} Chart`
            }
          />
        )}
      </div>
    </div>
  );
}

export default LeftContainer;

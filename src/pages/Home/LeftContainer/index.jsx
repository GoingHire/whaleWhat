import React, { useState, useEffect, useMemo } from "react";
import DropDown from "../../../components/DropDown";
import ChartComponent from "../../../components/Chart";
import BtnContainer from "./BtnContainer";
function LeftContainer() {
  const [coinType, setCoinType] = useState("BTC");
  const [subCoinType, setSubCoinType] = useState("BTC");
  const [selected, setSelected] = useState("1W");
  const [selectedSubDate, setSelectedSubDate] = useState("Daily");
  const [selectedChartType, setSelectedChartType] = useState("candlestick");
  const [subChartType, setSubChartType] = useState("입금량");
  const handleSelect = (option, index) => {
    setCoinType(option);
  };
  const onClickHandler = (date) => {
    setSelected(date);
  };
  const dateSelecter = ["1D", "1W", "1M"];

  const chartTypeSelecter = [
    { id: "candle", name: "candlestick" },
    { id: "line", name: "line" },
  ];
  const subChartDateSelector = ["Daily", "Monthly"];
  const subCoinTypeSelecter = ["BTC", "ETH"];
  const subChartChoices = [
    {
      id: "입금량",
      chartType: "Inflow",
    },
    {
      id: "출금량",
      chartType: "Outflow",
    },
    {
      id: "입금량 빈도",
      chartType: "InflowFrequency",
    },
    {
      id: "출금량 빈도",
      chartType: "OutflowFrequency",
    },
    {
      id: "순입출금량",
      chartType: "Netflow",
    },
  ];

  const onClickTypeSelecter = (chartType) => {
    setSelectedChartType(chartType.name);
  };

  const subChartTypeSelector = useMemo(() => {
    let result = null;
    const coin = subCoinType === "BTC" ? "btc" : "eth";
    const type = subChartChoices.find(
      (subChart) => subChart.id === subChartType
    ).chartType;
    result =
      type === "Netflow"
        ? coin + type + "Monthly"
        : coin + type + selectedSubDate;
    return result;
  }, [subChartChoices, selectedSubDate, subChartType]);

  return (
    <div className="flex flex-col w-full pl-28 gap-8">
      <div className="flex flex-col gap-8 pt-10">
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
        </div>
        <div className="flex flex-col text-start">
          <div className="text-white font-bold text-4xl">{coinType}</div>
          <div className=" text-slate-400 font-thin text-sm">
            {coinType === "BTC"
              ? "비트코인 가격 그래프"
              : "이더리움 가격 그래프"}
          </div>
        </div>
        <hr />
        <ChartComponent
          market={coinType === "BTC" ? "KRW-BTC" : "KRW-ETH"}
          unit={
            selected === "1W" ? "weeks" : selected === "1D" ? "days" : "months"
          }
          count={65}
          chartType={selectedChartType}
          containerId="MainChartContainer"
          titleText={
            selected === "1W"
              ? `${
                  coinType === "BTC" ? "Bitcoin" : "Ethereum"
                } Weekly ${selectedChartType} Chart`
              : selected === "1D"
              ? `${
                  coinType === "BTC" ? "Bitcoin" : "Ethereum"
                } Daily ${selectedChartType} Chart`
              : `${
                  coinType === "BTC" ? "Bitcoin" : "Ethereum"
                } Monthly ${selectedChartType} Chart`
          }
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col text-start">
          <div className="text-white font-bold text-4xl">지표</div>
          <div className=" text-slate-400 font-thin text-sm">
            whaleTracker는 온체인 데이터 및 구글 검색 엔진 데이터 등 다양한
            지표들을 제공합니다.
          </div>
          <hr />
        </div>
        <div className="flex gap-24">
          <div className="grid gap-8">
            <div className="grid gap-4">
              <div className="flex gap-8 text-xl">
                {subCoinTypeSelecter.map((coinType, index) => {
                  return (
                    <button
                      key={index}
                      className={`hover:text-[#006EEB] ${
                        subCoinType === coinType
                          ? "text-blue-500"
                          : "text-white"
                      }`}
                      onClick={() => setSubCoinType(coinType)}
                    >
                      {coinType}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-8 text-xl">
                {subChartChoices.map((chartType, index) => {
                  return (
                    <button
                      key={index}
                      className={`hover:text-[#006EEB] ${
                        subChartType === chartType.id
                          ? "text-blue-500"
                          : "text-white"
                      }`}
                      onClick={() => setSubChartType(chartType.id)}
                    >
                      {chartType.id}
                    </button>
                  );
                })}
              </div>
              {subChartType === "순입출금량" ? null : (
                <div className="flex gap-8 text-xl">
                  {subChartDateSelector.map((subChartDate, index) => {
                    return (
                      <button
                        key={index}
                        className={`hover:text-[#006EEB] ${
                          selectedSubDate === subChartDate
                            ? "text-blue-500"
                            : "text-white"
                        }`}
                        onClick={() => setSelectedSubDate(subChartDate)}
                      >
                        {subChartDate}
                      </button>
                    );
                  })}
                </div>
              )}
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
                chartType={subChartTypeSelector}
                containerId="SubChartContainer"
                titleText={
                  selected === "1W"
                    ? `Ethereum Weekly ${selectedChartType} Chart`
                    : selected === "1D"
                    ? `Ethereum Daily ${selectedChartType} Chart`
                    : `Ethereum Monthly ${selectedChartType} Chart`
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftContainer;

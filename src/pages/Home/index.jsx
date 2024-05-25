import React from "react";
import Header from "../../layout/Header";
import DropDown from "../../components/DropDown";
import ChartComponent from "../../components/Chart";

function Home() {
  const handleSelect = (option, index) => {
    console.log(`Selected option: ${option} at index ${index}`);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 pl-28 pt-10">
        <DropDown options={["a", "b"]} onSelect={handleSelect} />
        <div className="flex gap-4 text-lg">
          <button className="text-white hover:text-[#006EEB]">1M</button>
          <button className="text-white hover:text-[#006EEB]">1D</button>
        </div>
        {/* Uncomment and adjust as needed */}
        {/* <ChartComponent
          market="KRW-BTC"
          unit="months"
          count={0}
          containerId="bitcoinMonthlyCandleChart"
          titleText="Bitcoin Monthly Candle Chart"
          chartType="candlestick"
        />
        <ChartComponent
          market="KRW-BTC"
          unit="weeks"
          count={0}
          containerId="bitcoinWeeklyCandleChart"
          titleText="Bitcoin Weekly Candle Chart"
          chartType="candlestick"
        />
  */}
        <ChartComponent
          market="KRW-ETH"
          unit="months"
          count={65}
          containerId="ethereumMonthlyCandleChart"
          titleText="Ethereum Monthly Candle Chart"
          chartType="candlestick"
        />
        {/*}
        <ChartComponent
          market="KRW-ETH"
          unit="weeks"
          count={0}
          containerId="ethereumWeeklyCandleChart"
          titleText="Ethereum Weekly Candle Chart"
          chartType="candlestick"
        /> 
        {/* Add Line Charts */}
        {/* <ChartComponent
          market="KRW-BTC"
          unit="months"
          count={50}
          containerId="bitcoinMonthlyLineChart"
          titleText="Bitcoin Monthly Line Chart"
          chartType="line"
        />
        <ChartComponent
          market="KRW-BTC"
          unit="weeks"
          count={50}
          containerId="bitcoinWeeklyLineChart"
          titleText="Bitcoin Weekly Line Chart"
          chartType="line"
        />
        <ChartComponent
          market="KRW-ETH"
          unit="months"
          count={50}
          containerId="ethereumMonthlyLineChart"
          titleText="Ethereum Monthly Line Chart"
          chartType="line"
        />
        <ChartComponent
          market="KRW-ETH"
          unit="weeks"
          count={50}
          containerId="ethereumWeeklyLineChart"
          titleText="Ethereum Weekly Line Chart"
          chartType="line"
        /> */}
        <ChartComponent
          market="real_flow"
          unit=""
          count={0}
          containerId="realFlowIndicator"
          titleText="ETH-1Month-Real outflow Indicator"
          chartType="subindicator"
        />
      </div>
    </div>
  );
}

export default Home;

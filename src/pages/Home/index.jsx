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
        
  {/*      <ChartComponent
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
        <ChartComponent
          market="KRW-ETH"
          unit="months"
          count={65}
          containerId="ethereumMonthlyCandleChart"
          titleText="Ethereum Monthly Candle Chart"
          chartType="candlestick"
        />
        <ChartComponent
          market="KRW-ETH"
          unit="weeks"
          count={0}
          containerId="ethereumWeeklyCandleChart"
          titleText="Ethereum Weekly Candle Chart"
          chartType="candlestick"
        /> 

        // Add Line Charts 
        <ChartComponent
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
        />

        <ChartComponent
          containerId="ethOutflowDailyChart"
          titleText="ETH Outflow Value Daily"
          chartType="ethoutflowdaily" //안됨
        />
        <ChartComponent
          containerId="ethOutflowFrequencyDailyChart"
          titleText="ETH Outflow Frequency Daily"
          chartType="ethoutflowfrequencydaily"
        />
        <ChartComponent
          containerId="ethOutflowMonthlyChart"
          titleText="ETH Outflow Value Monthly"
          chartType="ethoutflow" //안됨
        />
        <ChartComponent
          containerId="ethOutflowFrequencyMonthlyChart"
          titleText="ETH Outflow Frequency Monthly"
          chartType="ethoutflowfrequency"
        />
        <ChartComponent
          containerId="ethInflowMonthlyChart"
          titleText="ETH Inflow Value Monthly"
          chartType="ethinflow"
        />
        <ChartComponent
          containerId="ethInflowDailyChart"
          titleText="ETH Inflow Value Daily"
          chartType="ethinflowdaily"
        />
        <ChartComponent
          containerId="ethInflowFrequencyMonthlyChart"
          titleText="ETH Inflow Frequency Monthly"
          chartType="ethinflowfrequencymonthly"
        />
        
        <ChartComponent
          containerId="ethInflowFreequencyDailyChart"
          titleText="ETH Inflow Frequency Daily"
          chartType="ethinflowfrequencydaily"
        />
        <ChartComponent
          containerId="ethNetflowMonthlyChart"
          titleText="ETH Netflow Monthly"
          chartType="netflow"
        />
        */}
      </div>
    </div>
  );  
}

export default Home;

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
        <ChartComponent
          market="KRW-BTC"
          unit="months"
          count={65}
          containerId="bitcoinChartContainer"
          titleText="Bitcoin Monthly Candle Chart"
        />
        <ChartComponent
          market="KRW-BTC"
          unit="weeks"
          count={65}
          containerId="bitcoinChartContainer2"
          titleText="Bitcoin Weekly Candle Chart"
        />
        <ChartComponent
          market="KRW-ETH"
          unit="months"
          count={65}
          containerId="ethereumChartContainer"
          titleText="Ethereum Monthly Candle Chart"
        />
        <ChartComponent
          market="KRW-ETH"
          unit="weeks"
          count={65}
          containerId="ethereumChartContainer2"
          titleText="Ethereum Weekly Candle Chart"
        />
      </div>
    </div>
  );
}

export default Home;

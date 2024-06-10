import React, { useEffect, useState, useRef } from "react";

const upbitBaseUrl = "https://api.upbit.com/v1/candles";

const ChartTypeUrl =
  "https://g9glozrah7.execute-api.ap-northeast-2.amazonaws.com/default/";

const chartTypes = {
  //eth
  ethNetflowMonthly: "netflow_month", //이더리움 순입출금량
  ethOutflowMonthly: "LambdaFunctionWithRDS", //출금량 (Monthly) v
  ethInflowMonthly: "wtb_value_month", // 입금량 (Monthly) v
  ethOutflowFrequencyMonthly: "btw_fre_month", // 출금량 빈도 (Monthly)
  ethOutflowDaily: "btw_daily", // 출금량 일봉/월봉 v
  ethInflowDaily: "wtb_value_daily", // 이더리움 입금량 daily v
  ethOutflowFrequencyDaily: "btw_fre_daily", // 출금량 빈도 (Daily) v
  ethInflowFrequencyMonthly: "wtb_fre_month", // v
  ethInflowFrequencyDaily: "wtb_fre_daily", //v
  //btc
  btcNetflowMonthly: "btc_netflow_month", // q비트코인 순입출금량
  btcOutflowMonthly: "btw_btc_value_month", //btc value monthly
  btcInflowMonthly: "wtb_btc_value_month", // v 비트코인 inflow 거래량 월별
  btcOutflowFrequencyMonthly: "btw_btc_fre_month", // 비트쾬 outlfow 빈도 월별
  btcOutflowDaily: "btw_btc_value_daily", //v
  btcInflowDaily: "wtb_btc_value_daily", // v
  btcOutflowFrequencyDaily: "btw_btc_fre_daily", //비트코인 outflow 빈도 일별
  btcInflowFrequencyMonthly: "wtb_btc_fre_month", //v 비트코인 inflow 빈도 월별
  btcInflowFrequencyDaily: "wtb_btc_fre_daily", //v 비트코인 inflow 빈도 일별
};

// Function to fetch data from API
async function fetchData(chartType) {
  // const queryString = new URLSearchParams(params).toString();

  const endUrl = chartTypes[chartType];
  const fullUrl = ChartTypeUrl + endUrl;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${fullUrl}:`, error);
    return [];
  }
}
async function fetchUpbit(url, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${fullUrl}:`, error);
    return [];
  }
}
// Function to render chart
function renderChart(data, containerId, titleText, chartType) {
  let chartData;
  let dataSeries = [];

  if (chartType === "candlestick") {
    chartData = data.map((item) => ({
      x: new Date(item.candle_date_time_utc),
      y: item.trade_price,
      color: "#006EEB",
    }));

    dataSeries.push({
      type: "column",
      risingColor: "green",
      fallingColor: "red",
      dataPoints: chartData,
    });
  } else if (chartType === "line") {
    chartData = data.map((item) => ({
      x: new Date(item.candle_date_time_utc),
      y: item.trade_price,
    }));

    dataSeries.push({
      type: "line",
      lineColor: "#000feb",
      dataPoints: chartData,
    });
  } else if (
    chartType === "ethNetflowMonthly" ||
    chartType === "btcNetflowMonthly"
  ) {
    //charType  btc 추가
    chartData = data.map((item) => {
      const dateParts = item.YearMonth.split("-");
      return {
        x: new Date(dateParts[0], dateParts[1] - 1), // Year, Month (0-based)
        y: item.NetValue,
        color: item.NetValue >= 0 ? "green" : "red",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Netflow",
      showInLegend: true,
      color: function (e) {
        console.log("e.dataPoint");
        return e.dataPoint.y >= 0 ? "green" : "red";
      },
      dataPoints: chartData,
    });
  } else if (
    chartType === "ethOutflowMonthly" ||
    chartType === "btcOutflowMonthly"
  ) {
    //charType  btc 추가
    chartData = data.map((item) => {
      const key = Object.keys(item);
      const dateParts = item[key[0]].split("-");

      return {
        x: new Date(dateParts[0], dateParts[1] - 1), // Year, Month (0-based)
        y: item[key[1]],
        color: "green",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Outflow Value",
      showInLegend: true,
      color: function (e) {
        return "green";
      },
      dataPoints: chartData,
    });
  } else if (
    chartType === "ethInflowMonthly" ||
    chartType === "btcInflowMonthly"
  ) {
    //charType  btc 추가
    chartData = data.map((item) => {
      const dateParts = item.YearMonth.split("-");
      return {
        x: new Date(dateParts[0], dateParts[1] - 1), // Year, Month (0-based)
        y: item.Value,
        color: "red",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Inflow Value",
      showInLegend: true,
      color: function (e) {
        return "red";
      },
      dataPoints: chartData,
    });
  } else if (
    chartType === "ethOutflowDaily" ||
    chartType === "btcOutflowDaily"
  ) {
    //charType  btc 추가
    chartData = data.map((item) => {
      const dateParts = item.Time.split("-");
      return {
        x: new Date(dateParts[0], dateParts[1] - 1, dateParts[2]), // Year, Month (0-based), Day
        y: item.Value,
        color: "green",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Outflow Value Daily",
      showInLegend: true,
      color: function (e) {
        return "green";
      },
      dataPoints: chartData,
    });
  } else if (chartType === "ethInflowDaily" || chartType === "btcInflowDaily") {
    //charType  btc 추가
    chartData = data.map((item) => {
      const dateParts = item.Time.split("-");
      return {
        x: new Date(dateParts[0], dateParts[1] - 1, dateParts[2]), // Year, Month (0-based), Day
        y: item.Value,
        color: "red",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Inflow Value Daily",
      showInLegend: true,
      color: function (e) {
        return "red";
      },
      dataPoints: chartData,
    });
  } else if (
    chartType === "ethOutflowFrequencyDaily" ||
    chartType === "btcOutflowFrequencyDaily"
  ) {
    //charType  btc 추가
    chartData = data.map((item) => {
      const dateParts = item.Time.split("-");
      return {
        x: new Date(dateParts[0], dateParts[1] - 1, dateParts[2]), // Year, Month (0-based), Day
        y: item.Count,
        color: "green",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Outflow Frequency Daily",
      showInLegend: true,
      color: function (e) {
        return "green";
      },
      dataPoints: chartData,
    });
  } else if (
    chartType === "ethInflowFrequencyMonthly" ||
    chartType === "btcInflowFrequencyMonthly"
  ) {
    //charType  btc 추가
    chartData = data.map((item) => {
      const dateParts = item.YearMonth.split("-");
      return {
        x: new Date(dateParts[0], dateParts[1] - 1), // Year, Month (0-based)
        y: item.TransactionCount,
        color: "red",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Inflow Frequency Monthly",
      showInLegend: true,
      color: function (e) {
        return "red";
      },
      dataPoints: chartData,
    });
  } else {
    chartData = data.map((item) => {
      const key = Object.keys(item);
      const dateParts = item[key[0]].split("-");

      return {
        x: new Date(dateParts[0], dateParts[1] - 1), // Year, Month (0-based)
        y: item[key[1]],
        color: "green",
      };
    });

    dataSeries.push({
      type: "column",
      name: "Outflow Value",
      showInLegend: true,
      color: function (e) {
        return "green";
      },
      dataPoints: chartData,
    });
  }

  const axisYConfig =
    chartType === "ethNetflowMonthly" || chartType === "btcNetflowMonthly"
      ? {
          //charType  btc 추가
          title: "Netflow",
          labelFontColor: "white",
          titleFontColor: "white",
          minimum: -900000, // Adjust based on your data
          maximum: 600000, // Adjust based on your data
        }
      : {
          title: chartType.includes("Outflow")
            ? "Outflow Value"
            : chartType.includes("Inflow")
            ? "Inflow Value"
            : chartType.includes("Frequency")
            ? "Frequency"
            : "Netflow",

          labelFontColor: "white",
          titleFontColor: "white",
          minimum: 0, // Start from 0 for outflow and inflow
          maximum: Math.max(...chartData.map((d) => d.y)) * 1.1, // Adjust based on your data
        };

  const chart = new CanvasJS.Chart(containerId, {
    theme: "dark2",
    backgroundColor: "#000000",
    title: {
      text: titleText,
      fontColor: "white",
    },
    axisX: {
      valueFormatString: chartType.includes("daily") ? "YYYY MMM" : "YYYY MMM",
      labelFontColor: "white",
    },
    axisY: axisYConfig,
    data: dataSeries,
  });

  chart.render();
}

const ChartComponent = ({
  market,
  unit,
  count,
  containerId,
  titleText,
  chartType,
}) => {
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchDataAndRender = async () => {
      //btc렌더링 추가
      try {
        let response = [];
        if (chartType === "candlestick" || chartType === "line") {
          response = await fetchUpbit(`${upbitBaseUrl}/${unit}`, {
            market,
            count,
          });
        } else {
          console.log(chartType);
          response = await fetchData(chartType);
        }

        if (response.length === 0) {
          setError("No data available");
        } else {
          renderChart(response, containerId, titleText, chartType);
        }
      } catch (error) {
        setError("Error fetching data");
      }
    };

    const loadCanvasJS = async () => {
      if (!window.CanvasJS) {
        const script = document.createElement("script");
        script.src = "https://canvasjs.com/assets/script/canvasjs.min.js";
        script.onload = () => fetchDataAndRender();
        document.body.appendChild(script);
      } else {
        fetchDataAndRender();
      }
    };

    loadCanvasJS();
  }, [market, unit, count, containerId, titleText, chartType]);

  // Scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleMouseDown = (event) => {
      isDragging.current = true;
      startX.current = event.pageX - scrollContainer.offsetLeft;
      scrollLeft.current = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      scrollContainer.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      scrollContainer.style.cursor = "grab";
    };

    const handleMouseMove = (event) => {
      if (!isDragging.current) return;
      event.preventDefault();
      const x = event.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX.current) * 2;
      scrollContainer.scrollLeft = scrollLeft.current - walk;
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="w-full" ref={scrollContainerRef}>
      <div
        id={containerId}
        className="chart-wrapper"
        style={{ height: "550px" }}
      ></div>
    </div>
  );
};

export default ChartComponent;

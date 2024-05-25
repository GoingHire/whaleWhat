import React, { useEffect, useState, useRef } from "react";

const upbitBaseUrl = 'https://api.upbit.com/v1/candles';
const subIndicatorUrl = 'https://g9glozrah7.execute-api.ap-northeast-2.amazonaws.com/default/LambdaFunctionWithRDS';  //이더리움 1month real_flow data

// Function to fetch data from Upbit API
async function fetchData(url, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Fetched data from ${fullUrl}:`, data); // Log fetched data
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${fullUrl}:`, error);
        return [];
    }
}

// Function to render chart given data and container ID
function renderChart(data, containerId, titleText, chartType, subIndicatorData = []) {
    console.log(`Rendering chart for container: ${containerId}, with data:`, data); // Log data to be rendered
    let chartData;
    let dataSeries = [];

    if (chartType === "candlestick") {
        chartData = data.map(item => ({
            x: new Date(item.candle_date_time_utc),
            y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
        }));

        dataSeries.push({
            type: "candlestick",
            risingColor: "green",
            fallingColor: "red",
            color: "transparent",
            dataPoints: chartData
        });
    } 
    if (chartType === "line") {
        chartData = data.map(item => ({
            x: new Date(item.candle_date_time_utc),
            y: item.trade_price,
        }));

        dataSeries.push({
            type: "line",
            lineColor: "#000feb",
            dataPoints: chartData
        });
    }
    if (chartType === "subindicator" && subIndicatorData.length > 0) {
        const subIndicatorChartData = subIndicatorData.map(item => {
            const dateParts = item.YearMonth.split("-");
            return {
                x: new Date(dateParts[0], dateParts[1] - 1), // Year, Month (0-based)
                y: item.Value,
                color: item.Value >= 0 ? "green" : "red"
            };
        });

        console.log(`Sub-indicator data:`, subIndicatorChartData); // Log sub-indicator data

        dataSeries.push({
            type: "column",
            axisYType: "secondary",
            risingColor: "green",
            fallingColor: "red",
            dataPoints: subIndicatorChartData
        });
    }

    const chart = new CanvasJS.Chart(containerId, {
        theme: "light2",
        backgroundColor: "#000000",
        title: { 
            text: titleText,
            fontColor: "white"
        },
        axisX: { 
            valueFormatString: "MMM YYYY",
            labelFontColor: "white"
        },
        axisY: {
            title: "Price (KRW)",
            prefix: "₩",
            labelFontColor: "white",
            titleFontColor: "white"
        },
        axisY2: chartType === "subindicator" ? {
            title: "ETH outflow",
            labelFontColor: "white",
            titleFontColor: "white",
            minimum: -2000000, // Adjust based on your data
            maximum: 2000000  // Adjust based on your data
        } : undefined,
        data: dataSeries
    });

    chart.render();
}

const ChartComponent = ({ market, unit, count, containerId, titleText, chartType }) => {
  const [error, setError] = useState(null);
  const [subIndicatorData, setSubIndicatorData] = useState([]);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const loadCanvasJS = () => {
      if (!window.CanvasJS) {
        const script = document.createElement("script");
        script.src = "https://canvasjs.com/assets/script/canvasjs.min.js";
        script.onload = () => fetchDataAndRender();
        document.body.appendChild(script);
      } else {
        fetchDataAndRender();
      }
    };

    const fetchDataAndRender = async () => {
      try {
        let mainData = [];
        if (chartType !== "subindicator") {
          mainData = await fetchData(`${upbitBaseUrl}/${unit}`, { market, count });
        }
        
        let subIndicator = [];
        if (chartType === "subindicator") {
          subIndicator = await fetchData(subIndicatorUrl);
        }

        if ((chartType !== "subindicator" && mainData.length === 0) || (chartType === "subindicator" && subIndicator.length === 0)) {
          setError('No data available');
        } else {
          setSubIndicatorData(subIndicator);
          renderChart(mainData, containerId, titleText, chartType, subIndicator);
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    loadCanvasJS();
  }, [market, unit, count, containerId, titleText, chartType]);


  //스크롤 기능
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleMouseDown = (event) => {
      isDragging.current = true;
      startX.current = event.pageX - scrollContainer.offsetLeft;
      scrollLeft.current = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      scrollContainer.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      scrollContainer.style.cursor = 'grab';
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
    <div className="scroll-container" ref={scrollContainerRef}>
      <div id={containerId} className="chart-wrapper" style={{ height: "300px" }}></div>
    </div>
  );
};

export default ChartComponent;

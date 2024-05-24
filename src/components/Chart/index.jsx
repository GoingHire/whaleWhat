import React, { useEffect, useState, useRef } from "react";

const upbitBaseUrl = 'https://api.upbit.com/v1/candles';

// Function to fetch data from Upbit API
async function fetchData(market, unit, count) {
    const url = `${upbitBaseUrl}/${unit}`;
    const params = new URLSearchParams({
        market,
        count
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${market} ${unit} data:`, error);
        return [];
    }
}

// Function to render chart given data and container ID
function renderChart(data, containerId, titleText) {
    const chartData = data.map(item => ({
        x: new Date(item.candle_date_time_utc),
        y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
    }));

    const chart = new CanvasJS.Chart(containerId, {
        theme: "light2",
        title: { text: titleText },
        axisX: { valueFormatString: "MMM YYYY" },
        axisY: {
            title: "Price (KRW)",
            prefix: "₩",
        },
        data: [{
            type: "candlestick",
            risingColor: "green", // 양수 캔들의 색상 설정
            fallingColor: "red", // 음수 캔들의 색상 설정
            dataPoints: chartData
        }]
    });

    chart.render();
}

const ChartComponent = ({ market, unit, count, containerId, titleText }) => {
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const loadCanvasJS = () => {
      if (!window.CanvasJS) {
        const script = document.createElement("script");
        script.src = "https://canvasjs.com/assets/script/canvasjs.min.js";
        script.onload = () => fetchAndRenderChart();
        document.body.appendChild(script);
      } else {
        fetchAndRenderChart();
      }
    };

    const fetchAndRenderChart = async () => {
      const data = await fetchData(market, unit, count);
      if (data.length === 0) {
        setError('No data available');
      } else {
        renderChart(data, containerId, titleText);
      }
    };

    loadCanvasJS();
  }, [market, unit, count, containerId, titleText]);

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
      const walk = (x - startX.current) * 2; // Multiply by 2 to increase the scroll speed
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

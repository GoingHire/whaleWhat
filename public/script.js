// Fetch and render Bitcoin monthly data
fetch("/api/bitcoin-monthly")
  .then((response) => response.json())
  .then((data) =>
    renderChart(data, "bitcoinChartContainer", "Bitcoin Monthly Candle Chart")
  )
  .catch((error) => console.error("Error fetching Bitcoin data:", error));

// Fetch and render Ethereum monthly data
fetch("/api/ethereum-monthly")
  .then((response) => response.json())
  .then((data) =>
    renderChart(data, "ethereumChartContainer", "Ethereum Monthly Candle Chart")
  )
  .catch((error) => console.error("Error fetching Ethereum data:", error));

// Fetch and render Bitcoin weekly data
fetch("/api/bitcoin-weekly")
  .then((response) => response.json())
  .then((data) =>
    renderChart2(data, "bitcoinChartContainer2", "Bitcoin Weekly Candle Chart")
  )
  .catch((error) =>
    console.error("Error fetching Bitcoin weekly data:", error)
  );

// Fetch and render Ethereum weekly data
fetch("/api/ethereum-weekly")
  .then((response) => response.json())
  .then((data) =>
    renderChart2(
      data,
      "ethereumChartContainer2",
      "Ethereum Weekly Candle Chart"
    )
  )
  .catch((error) =>
    console.error("Error fetching Ethereum weekly data:", error)
  );

// Fetch and render Bitcoin daily data
fetch("/api/bitcoin-daily")
  .then((response) => response.json())
  .then((data) =>
    renderChart3(data, "bitcoinChartContainer3", "Bitcoin daily Candle Chart")
  )
  .catch((error) => console.error("Error fetching Bitcoin daily data:", error));

// Fetch and render Ethereum daily data
fetch("/api/ethereum-daily")
  .then((response) => response.json())
  .then((data) =>
    renderChart3(data, "ethereumChartContainer3", "Ethereum daily Candle Chart")
  )
  .catch((error) =>
    console.error("Error fetching Ethereum daily data:", error)
  );

// Function to render chart given data and container ID
export function renderChart(data, containerId, titleText) {
  const chartData = data.map((item) => ({
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
    data: [
      {
        type: "candlestick",
        dataPoints: chartData,
      },
    ],
  });

  chart.render();
}

// Function to render chart given data and container ID
export function renderChart2(data, containerId, titleText) {
  const chartData = data.map((item) => ({
    x: new Date(item.candle_date_time_utc),
    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
  }));

  const chart = new CanvasJS.Chart(containerId, {
    theme: "light2",
    title: { text: titleText },
    axisX: { valueFormatString: "dd MMM YYYY" },
    axisY: {
      title: "Price (KRW)",
      prefix: "₩",
    },
    data: [
      {
        type: "candlestick",
        dataPoints: chartData,
      },
    ],
  });

  chart.render();
}

// Function to render chart given data and container ID
export function renderChart3(data, containerId, titleText) {
  const chartData = data.map((item) => ({
    x: new Date(item.candle_date_time_utc),
    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
  }));

  const chart = new CanvasJS.Chart(containerId, {
    theme: "light2",
    title: { text: titleText },
    axisX: { valueFormatString: "dd MMM YYYY" },
    axisY: {
      title: "Price (KRW)",
      prefix: "₩",
    },
    data: [
      {
        type: "candlestick",
        dataPoints: chartData,
      },
    ],
  });

  chart.render();
}
///////////////////////////

function calculateSMA(data, period) {
  let sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null); // Not enough data to calculate SMA
    } else {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j].trade_price;
      }
      sma.push(sum / period);
    }
  }
  return sma;
}

function renderChart2(data, containerId, titleText) {
  const chartData = data.map((item) => ({
    x: new Date(item.candle_date_time_utc),
    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
  }));

  // Calculate a 10-period SMA
  const smaData = calculateSMA(data, 10)
    .map((sma, index) => ({
      x: new Date(data[index].candle_date_time_utc),
      y: sma,
    }))
    .filter((point) => point.y !== null); // Filter out null values to avoid errors in rendering

  const chart = new CanvasJS.Chart(containerId, {
    theme: "light2",
    title: { text: titleText },
    axisX: { valueFormatString: "DD MMM YYYY" },
    axisY: {
      title: "Price (KRW)",
      prefix: "₩",
    },
    data: [
      {
        type: "candlestick",
        name: "Candlestick",
        showInLegend: true,
        yValueFormatString: "₩#,###.##",
        dataPoints: chartData,
      },
      {
        type: "line",
        name: "SMA",
        showInLegend: true,
        lineColor: "#FF5733", // Customize line color
        yValueFormatString: "₩#,###.##",
        dataPoints: smaData,
      },
    ],
  });

  chart.render();
}

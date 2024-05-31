const upbitBaseUrl = "https://api.upbit.com/v1/candles";

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
export const fetchMainChart = async (unit, market, count) => {
  const result = await fetchData(`${upbitBaseUrl}/${unit}`, {
    market,
    count,
  });
  return result;
};

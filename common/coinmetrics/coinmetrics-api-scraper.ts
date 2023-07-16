import { ApiResponse } from "../constants";

async function fetchData(url: string): Promise<any[]> {
  let results: any[] = [];
  let nextPageUrl: string | null = url;
  // API rate limit vars (10 reqs/ 6 seconds on a sliding window, per IP)
  let remainingRequests = 10;
  let delay = 7000; // only making 10 reqs / 7 seconds just to be cautious

  while (nextPageUrl) {
    try {
      if (remainingRequests === 0) {
        // Delay for 7 seconds to respect rate limit
        await new Promise((resolve) => setTimeout(resolve, delay));
        remainingRequests = 10;
      }

      const response: Response = await fetch(nextPageUrl);
      const { data, next_page_url }: ApiResponse = await response.json();
      results = results.concat(data);
      nextPageUrl = next_page_url;
      remainingRequests--;
    } catch (error) {
      console.error("Error fetching data:", error);
      break;
    }
  }

  return results;
}

const rootUrl =
  "https://community-api.coinmetrics.io/v4/timeseries/asset-metrics";
const asset = "btc";
const metrics = [
  "AdrBalUSD1KCnt",
  "AdrBalUSD10KCnt",
  "AdrBalUSD100KCnt",
  "AdrBalUSD1MCnt",
  "AdrBalUSD10MCnt",
];
const frequency = "1d";
const startTime = "2010-07-18";
const endTime = "2023-06-26";

const apiUrl = `${rootUrl}?assets=${asset}&metrics=${metrics.join(
  ","
)}&frequency=${frequency}&start_time=${startTime}&end_time=${endTime}`;

fetchData(apiUrl)
  .then((data: any[]) => {
    console.log("Data:", data); // I manually saved this log output to ./data/time-series/coinmetrics-data.json
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

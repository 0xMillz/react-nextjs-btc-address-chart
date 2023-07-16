import { promises as fs } from "fs";
import path from "path";
import { CoinMetricsCntNames, CoinMetricsTimeSerie, metricNameToTrancheMap, trancheToColorMap } from "../constants";
import { Datum, Serie } from "@nivo/line";

export async function jsonFileToObject(): Promise<any> {
  try {
    const filePath = path.resolve(
      process.cwd(),
      'data/time-series/coinmetrics-data.json'
    );

    const jsonString = await fs.readFile(filePath, "utf8");
    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error)
    throw error;
  }
}

export function sortCoinMetricsTimeSeries(data: CoinMetricsTimeSerie[]): CoinMetricsTimeSerie[]  {
  return data.sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime()
  });
}

export function formatDataForNivoLineChart(data: CoinMetricsTimeSerie[]): Serie[] {
  const coinMetricsIds: string[] = Object.keys(CoinMetricsCntNames);

  const nivoSeries: Serie[] = coinMetricsIds
  .map((coinMetricsId) => {
    const id = metricNameToTrancheMap.get(coinMetricsId) as string
    const nivoSerie: Serie = {
      id,
      color: trancheToColorMap.get(id) as string,
      data: data.map((item) => {
        const datum: Datum = {
          x: item.time.replace('T00:00:00.000000000Z', ''),
          y: item[coinMetricsId as CoinMetricsCntNames]
        };
        return datum;
      }),
    };
    return nivoSerie;
  });
  return nivoSeries;
}
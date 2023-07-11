import { Serie } from "@nivo/line";
import { parseISO, format } from "date-fns";
import {
  formatDataForNivoLineChart,
  jsonFileToObject,
  sortCoinMetricsTimeSeries,
} from "./coinmetrics/coinmetrics-sanitizer";
import { CoinMetricsTimeSerie, TimeFrame } from "./constants";

export function formatDateString(
  dateString: string,
  formatString: string = "LLLL d, yyyy"
): string {
  const date = parseISO(dateString);
  return format(date, formatString);
}

export async function getChartData(queryTimeFrame?: string): Promise<Serie[]> {
  let timeFrame: TimeFrame = getTimeFrame(queryTimeFrame); // Bonus Todo: use this

  const rawCoinMetricsData =
    (await jsonFileToObject()) as CoinMetricsTimeSerie[];
  const sortedCoinMetricsData = sortCoinMetricsTimeSeries(rawCoinMetricsData);
  const chartFormattedData = formatDataForNivoLineChart(sortedCoinMetricsData);

  return chartFormattedData;
}

export function getTimeFrame(value: string | undefined): TimeFrame {
  if (!Object.values(TimeFrame).includes(value as TimeFrame)) {
    return TimeFrame.ALL;
  }
  return value as TimeFrame;
}

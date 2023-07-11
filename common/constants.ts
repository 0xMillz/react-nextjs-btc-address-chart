export enum TimeFrame {
  ALL = "ALL",
  YTD = "YTD",
  ONE_YEAR = "1Y",
  SIX_MONTHS = "6M",
  THREE_MONTHS = "3M",
  ONE_MONTH = "1M",
}

export interface ApiResponse {
  data:
    | {
        asset: string | null;
        time: string | null;
        AdrBalUSD100KCnt: string | null;
        AdrBalUSD10KCnt: string | null;
        AdrBalUSD10MCnt: string | null;
        AdrBalUSD1KCnt: string | null;
        AdrBalUSD1MCnt: string | null;
      }[]
    | null;
  next_page_url: string | null;
}

export enum CoinMetricsCntNames {
  AdrBalUSD1KCnt = "AdrBalUSD1KCnt",
  AdrBalUSD10KCnt = "AdrBalUSD10KCnt",
  AdrBalUSD100KCnt = "AdrBalUSD100KCnt",
  AdrBalUSD1MCnt = "AdrBalUSD1MCnt",
  AdrBalUSD10MCnt = "AdrBalUSD10MCnt",
}

export interface CoinMetricsTimeSerie {
  asset: string;
  time: string;
  AdrBalUSD1KCnt: CoinMetricsCntNames;
  AdrBalUSD10KCnt: CoinMetricsCntNames;
  AdrBalUSD100KCnt: CoinMetricsCntNames;
  AdrBalUSD1MCnt: CoinMetricsCntNames;
  AdrBalUSD10MCnt: CoinMetricsCntNames;
}

export enum BalanceTranches {
  GTE_$1K = "≥$1K",
  GTE_$10k = "≥$10k",
  GTE_$100k = "≥$100k",
  GTE_$1M = "≥$1M",
  GTE_$10M = "≥$10M",
}

export const metricNameToTrancheMap = new Map<string, string>([
  [CoinMetricsCntNames.AdrBalUSD1KCnt, BalanceTranches.GTE_$1K],
  [CoinMetricsCntNames.AdrBalUSD10KCnt, BalanceTranches.GTE_$10k],
  [CoinMetricsCntNames.AdrBalUSD100KCnt, BalanceTranches.GTE_$100k],
  [CoinMetricsCntNames.AdrBalUSD1MCnt, BalanceTranches.GTE_$1M],
  [CoinMetricsCntNames.AdrBalUSD10MCnt, BalanceTranches.GTE_$10M],
]);

export const trancheToColorMap = new Map<string, string>([
  [BalanceTranches.GTE_$1K, "#1f00ff"],
  [BalanceTranches.GTE_$10k, "#f7c245"],
  [BalanceTranches.GTE_$100k, "#ff0000"],
  [BalanceTranches.GTE_$1M, "#b7b1e1"],
  [BalanceTranches.GTE_$10M, "#ef01ff"],
]);

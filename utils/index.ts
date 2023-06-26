import fs from "fs";
import { TimeFrame } from "@/pages/api/btc-addresses";
import Papa, { ParseConfig, ParseResult } from "papaparse";
import path from "path";
import { AreaBumpSerie, AreaBumpDatum, AreaBumpSerieExtraProps } from "@nivo/bump";

const enum OriginalCSVHeaders {
  TIME = "Time",
  COUNT_GTE_$1K = "BTC / Addr Cnt of Bal ≥ $1K",
  BAL_GTE_$10k = "BTC / Val in Addrs w/ Bal ≥ $10K USD",
  BAL_GTE_$100k = "BTC / Val in Addrs w/ Bal ≥ $100K USD",
  BAL_GTE_$1M = "BTC / Val in Addrs w/ Bal ≥ $1M USD",
  BAL_GTE_$10M = "BTC / Val in Addrs w/ Bal ≥ $10M USD",
}

enum NewHeaders {
  DATE = "Date",
  COUNT_GTE_$1K = "CountOfBTCAddressesWithBalancesWithUSDValuesGTE$1K",
  BAL_GTE_$10k = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$10k",
  BAL_GTE_$100k = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$100k",
  BAL_GTE_$1M = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$1M",
  BAL_GTE_$10M = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$10M",
}

enum AreaBumpSerieId {
  // not including this column because it is a count, not a BTC balance, and does not belong on the same chart
  // COUNT_GTE_$1K = "CountOfBTCAddressesWithBalancesWithUSDValuesGTE$1K",
  BAL_GTE_$10k = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$10k",
  BAL_GTE_$100k = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$100k",
  BAL_GTE_$1M = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$1M",
  BAL_GTE_$10M = "SumOfBTCBalancesFromAddressesWithUSDValuesGTE$10M",
}

type OriginalCSVHeadersType = keyof typeof OriginalCSVHeaders | string;
type NewHeadersType = keyof typeof NewHeaders | string;
type AreaBumpSerieIds = Extract<
  NewHeaders,
  // not including this column because it is an address count, not a BTC balance, and does not belong on the same chart
  // | NewHeaders.COUNT_GTE_$1K
  | NewHeaders.BAL_GTE_$10k
  | NewHeaders.BAL_GTE_$100k
  | NewHeaders.BAL_GTE_$1M
  | NewHeaders.BAL_GTE_$10M
>;

const headerMap = new Map<string, string>([
  [OriginalCSVHeaders.TIME, NewHeaders.DATE],
  [OriginalCSVHeaders.COUNT_GTE_$1K, NewHeaders.COUNT_GTE_$1K], // removing this column because it is a count, not a BTC balance
  [OriginalCSVHeaders.BAL_GTE_$10k, NewHeaders.BAL_GTE_$10k],
  [OriginalCSVHeaders.BAL_GTE_$100k, NewHeaders.BAL_GTE_$100k],
  [OriginalCSVHeaders.BAL_GTE_$1M, NewHeaders.BAL_GTE_$1M],
  [OriginalCSVHeaders.BAL_GTE_$10M, NewHeaders.BAL_GTE_$10M],
]);

export async function getChartData(timeFrame: TimeFrame) {
  const filePath = path.resolve(
    process.cwd(),
    `data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv`
  );
  const papaParsedData =  parseCSV(filePath);
  const nivoData = formatDataForNivoAreaChart(papaParsedData);
  console.log('nivoData: ', nivoData)
  return nivoData;
}

export function parseCSV(filePath: string): any[]  {
  const csvString = fs.readFileSync(filePath, "utf16le")
  .replace(/"/g, "") // remove all double quotes

  const parseConfig: ParseConfig = {
    header: true,
    transformHeader: (header, _): string => {
      const newHeader = headerMap.get(header) as string;
      return newHeader
    }
  };

  const { data, errors } = Papa.parse(csvString, parseConfig);

  if (errors.length > 0) {
    console.error("Error parsing CSV: ", errors);
  }

  return data;
}

export default function formatDataForNivoAreaChart(data: any[]): AreaBumpSerie<AreaBumpDatum, AreaBumpSerieExtraProps>[]  {
  const nivoIDs: AreaBumpSerieId[] = Object.values(AreaBumpSerieId);
  const nivoSeries: AreaBumpSerie<AreaBumpDatum, AreaBumpSerieExtraProps>[] = nivoIDs.map((id) => {
    const nivoSerie: AreaBumpSerie<AreaBumpDatum, AreaBumpSerieExtraProps> = {
      id,
      data: data.map((row) => {
        const datum: AreaBumpDatum = {
          x: row[NewHeaders.DATE],
          y: row[id],
        };
        return datum;
      }),
    };
    return nivoSerie;
  });
  console.log('nivoSeries: ', nivoSeries)
  return nivoSeries;
}



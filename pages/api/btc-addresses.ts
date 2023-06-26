import { NextApiRequest, NextApiResponse } from "next";
import { getChartData } from "../../utils";
import path from "path";
import { el } from "date-fns/locale";

export interface BTCBalances {
  header: string[];
  body: string[][];
}

export enum TimeFrame {
  ALL = "ALL",
  YTD = "YTD",
  SIX_MONTH = "6M",
  THREE_MONTH = "3M",
  ONE_MONTH = "1M"
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result;
  const { method, query } = req;
  try {
    if (method !== "GET") {
    res.status(405).json("Method not allowed");
    return;
  } else if (!Object.values(TimeFrame).includes(query.timeFrame as TimeFrame)) {
    res.status(400).json("Invalid time frame");
    return;
  } else {
    console.log("query.timeFrame", query.timeFrame);
    result = await getChartData(query.timeFrame as TimeFrame);
    res.status(200).json(result);
  }
  } catch (e) {
    console.error('500 error: ', e);
    res.status(500).json("An error has occurred");
  }
}

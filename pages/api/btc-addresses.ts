import { NextApiRequest, NextApiResponse } from "next";
import { getChartData, getTimeFrame } from "../../common";

export interface BTCBalances {
  header: string[];
  body: string[][];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  const { method, query } = req;

  try {
    if (method !== "GET") {
      res.status(405).json("Method not allowed");
      return;
    } else {
      const timeFrame = getTimeFrame(query.timeFrame as string);
      result = await getChartData(timeFrame);
      res.status(200).json(result);
    }
  } catch (e) {
    console.error("500 error: ", e);
    res.status(500).json("An internal server error has occurred. Please try again later.");
  }
}

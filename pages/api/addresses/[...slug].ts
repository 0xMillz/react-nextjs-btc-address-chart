import { NextApiRequest, NextApiResponse } from "next";
import { getChartData, getTimeFrame } from "../../../common";
import { Asset } from "../../../common/constants";
import { supportedAssets } from "data/time-series/supported-assets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  const { method, query } = req;

  try {
    const slugArray: Array<string> = query.slug as Array<string>;
    const asset = supportedAssets.find((a) => a.slug === slugArray[0]) as Asset;

    console.log("asset: ", asset)

    if (method !== "GET") {
      res.status(405).json("Method not allowed");
      return;
    } else if (!asset) {
      res.status(404).json("Asset not found");
      return;
    } else {
      const timeFrame = getTimeFrame(query.timeFrame as string);
      result = await getChartData(asset, timeFrame);
      res.status(200).json(result);
      return;
    }
  } catch (e) {
    console.error("500 error: ", e);
    res
      .status(500)
      .json("An internal server error has occurred. Please try again later.");
  }
}

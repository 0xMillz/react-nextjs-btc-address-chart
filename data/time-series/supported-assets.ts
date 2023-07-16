import { Asset } from "@/common/constants";

export const supportedAssets: Asset[] = [
    {
        slug: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        chain: "Bitcoin",
        dataFile: 'data/time-series/coinmetrics-data.json'
    },
    {
        slug: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        chain: "Ethereum"
    }
];

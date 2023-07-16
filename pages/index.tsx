import Head from "next/head";
import Layout from "../components/layout";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import LineChart from "@/components/chart/line-chart/[...slug]"
import { supportedAssets } from "data/time-series/supported-assets";
import { Asset } from "@/common/constants";
import { getAssetBySlug, getChartData } from "../common";

export default function Home({ chartData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout home>
      <Head>
        <title>USD value of Crypto Balances over Time</title>
        <meta name="description" content="A count of all crypto addresses grouped by USD-value into tiers over time" />
      </Head>
      <section style={{ width: "1000px", height: "500px", margin: "0 auto" }}>
          <LineChart data={chartData} asset={supportedAssets[0]}/>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, res } = context;
  const slug  = params?.[0] as string ?? 'bitcoin';
  
  const asset: Asset | undefined  = getAssetBySlug(slug as string);

  let timeFrame: string | undefined = params?.timeFrame as string;

  // HTTP fetching from the same server is inefficient, just import the code you need ;)
  const chartData = await getChartData(supportedAssets[0], timeFrame)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  )

  return { props: { chartData, asset } };
}


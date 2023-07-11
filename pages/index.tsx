import Head from "next/head";
import Layout from "../components/layout";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import LineChart from "@/components/chart/line-chart"
import { getChartData } from "../common";

export default function Home({ chartData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section style={{ width: "1000px", height: "500px", margin: "0 auto" }}>
          <LineChart data={chartData} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { headers } = req;
  let timeFrame: any = headers.timeFrame;

  if (typeof headers.timeFrame !== "string") {
    timeFrame = undefined;
  }
  // HTTP fetching from the same server is inefficient, just import the code you need ;)
  const chartData = await getChartData(timeFrame)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  )

  return { props: { chartData } };
}

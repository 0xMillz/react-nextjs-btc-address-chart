import Head from "next/head";
import Layout from "../components/layout";
import { GetServerSideProps } from "next";
import { Context } from "react";

import { data } from "../data/temp-data";
import Date from "@/components/date";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <Date dateString={"2021-01-01"} />
      <section>
        <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: Context<any>): Promise<GetServerSideProps> {
  const { params, req, res } = context;

  console.log("params", params);
    console.log("req", req);
    console.log("res", res);

  // fetching data from the same server is inefficient, just import what's already there!

  return {
    props: {
      balances: [],
    },
  };
}

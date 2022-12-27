import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Screen from "../components/Screen";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Screen />
    </div>
  );
};

export default Home;

import BannerHome from "@/components/BannerHome";
import Head from "next/head";
import LeadForm from "./submit-lead";


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BannerHome />
        <LeadForm />
      </main>
    </>
  );
}

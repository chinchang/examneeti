import Head from "next/head";
import { Card } from "../components/Card";

export default function Home() {
  return (
    <>
      <Head>
        <title>ExamNeeti - Sahi neeti, sahi disha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 max-w-6xl w-full">
        <h2 className="text-7xl mb-7">Let's Learn English</h2>
        <p className="text-4xl leading-normal mb-10">
          An online institute to learn English for Bank / SSC / CAT / DSSSB /
          UPSC / LIC / INSURANCE / CTET / DEFENCE / DRDO and State PSC
          examinations.
        </p>

        <Card heading="Schedule 🗓" anchor="schedule">
          <img src="/schedule.png" />
        </Card>
      </main>
    </>
  );
}

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
        {/* <h2 className="text-7xl mb-7">About Us</h2> */}

        <Card heading="About Us" anchor="about" marginBottom>
          <p className="mb-7">
            ExamNeeti is an initiative started by Madhvi Ma'am to teach people
            English, free of cost. It was founded in the year 2020 and since
            then people from various parts of the world, of varied age groups
            have benefitted from it and its motto -{" "}
            <em>Sahi Neeti, Sahi Disha</em> (right strategy, right direction).
            ExamNeeti has touched lacs of lives through Madhvi ma'am's
            passionate teaching.
          </p>

          <p className="mb-7">
            English is a very important skill to have whether you are preparing
            for job interviews, competitive exams and overall personality
            development. ExamNeeti aims to brings this skill in the reach of
            everyone, no matter where you are or what you do.
          </p>

          <p className="">
            So whether you are a student, preparing for competitive `exams`, a
            housewife, or a working person - if you want to learn English,
            become part of ExamNeeti.
          </p>
        </Card>

        <Card heading="About Your Teacher" anchor="teacher">
          <p className="mb-7">
            An Electronics Engineer by degree, <strong>Madhvi Ma'am</strong> is
            a professional English teacher having experience of more than 8
            years in the field. She has taught at institutes like Mahendras and
            is currently a guest faculty at T.I.M.E. She has also conducted
            various seminars across pan India.
          </p>

          <p className="mb-7">
            Teaching is her passion and with ExamNeeti, she aims to bring her
            knowledge in the reach of everyone without any cost! She aims to
            serve the poor strata and hence she started working towards it. Many
            of her students are placed in reputed government banks, government
            insurance companies and other institutions. She aspires to help the
            underprivileged children through her initiative, with the end goal
            to make every Indian learn English.
          </p>
        </Card>
      </main>
    </>
  );
}

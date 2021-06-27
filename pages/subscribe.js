import Head from "next/head";
import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function Subscribe() {
  const [buttonLabel, setButtonLabel] = useState("Subscribe Now");

  const subscribe = () => {
    window.pushowl.trigger("getCurrentPermission").then((permission) => {
      if (permission !== "default") return;
      window.pushowl
        .trigger("showWidget", { type: "browserPrompt" })
        .then(() => {
          setButtonLabel("yay! Subscribed");
        });
    });
  };

  return (
    <>
      <Head>
        <title>ExamNeeti - Sahi neeti, sahi disha</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.pushowl = window.pushowl || {
          queue: [],
          trigger: function (taskName, taskData) {
            return new Promise((resolve, reject) => {
                this.queue.push({
                  taskName,
                  taskData,
                  promise: { resolve, reject }
                })
            })
          },  
        }
        `,
          }}
        ></script>
        <script src="https://cdn.pushowl.com/sdks/pushowl-sdk.js?subdomain=examneeti&environment=production&shop=examneeti.myshopify.com"></script>
      </Head>

      <main className="flex-1 max-w-6xl w-full px-4">
        <h2 className="text-7xl mb-7">Let's Learn English</h2>
        <p className="text-2xl leading-normal mb-10">
          An online institute to learn English for Bank / SSC / CAT / DSSSB /
          UPSC / LIC / INSURANCE / CTET / DEFENCE / CLAT and State PSC
          examinations.
        </p>

        <Card heading="Subscribe to learn English Daily🗒" anchor="subscribe">
          <p className="mb-3 text-2xl text-gray-800">
            Roz apne mobile pe payen English seekhne k badhiya tareeke!
          </p>
          <p>Vocabulary badhao - Get daily notification about new words.</p>
          <p>Grammar seekho - Get daily notification on grammar tips.</p>

          <div className="mt-8 text-center">
            <Button onClick={subscribe}>{buttonLabel}</Button>
          </div>
        </Card>
      </main>
    </>
  );
}

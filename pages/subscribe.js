import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import confetti from "canvas-confetti";

export default function Subscribe() {
  const [buttonLabel, setButtonLabel] = useState(() => {
    if (typeof Notification !== "undefined") {
      if (Notification.permission === "granted")
        return "You are already subscribed";
    }
    return "Subscribe Now";
  });

  const intervalRef = useRef();

  const subscribe = () => {
    window.pushowl.trigger("getCurrentPermission").then((permission) => {
      if (permission !== "default") return;
      window.pushowl
        .trigger("showWidget", { type: "browserPrompt" })
        .then(() => {
          // Now keep checking after some seconds if user subscribed
          intervalRef.current = setInterval(() => {
            if (Notification.permission === "granted") {
              setButtonLabel("Yay! You are now subscribed!");
              confetti();
              setTimeout(confetti, 1000);
              clearInterval(intervalRef.current);
            }
          }, 1300);
        });
    });
  };

  useEffect(() => {
    // when this component unmount we want to clear the interval
    return () => {
      if (intervalRef) {
        clearInterval(intervalRef);
      }
    };
  });

  return (
    <>
      <Head>
        <title>
          ExamNeeti - Easy to read notifications for learning English
        </title>
        <meta name="description" content="English aayegi ab apke phone pe!" />
        <meta
          name="og:title"
          content="ExamNeeti - Easy to read notifications for learning English"
        />
        <meta
          property="og:description"
          content="English aayegi ab apke phone pe!"
        />
        <meta
          property="og:image"
          content="https://examneeti.com/subscribe-social.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/logo-square.png" />
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
        <h2 className="text-7xl mb-6">Let's Learn English</h2>
        <p className="text-xl leading-normal mb-10">
          An online institute to learn English for Bank / SSC / CAT / DSSSB /
          UPSC / LIC / INSURANCE / CTET / DEFENCE / CLAT and State PSC
          examinations.
        </p>

        <Card
          heading="Subscribe to learn English Daily????"
          anchor="subscribe"
          style={{
            background: "url(mob.png)",
            backgroundSize: "25%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
          }}
        >
          <p className="mb-8 text-2xl text-gray-800">
            Roz apne mobile pe payen English seekhne k badhiya tareeke!
          </p>
          <p className="mb-1">
            <strong>???? Vocabulary badhao</strong> - Get daily notification about
            new words.
          </p>
          <p className="mb-1">
            <strong>???? Grammar seekho</strong> - Get daily notification on
            grammar tips.
          </p>
          <p className="mb-1">
            <strong>???? Class notifications</strong> - Get notifications about
            ExamNeeti classes
          </p>

          <div className="mt-8 text-center">
            <Button onClick={subscribe}>{buttonLabel}</Button>
          </div>
        </Card>
      </main>
    </>
  );
}

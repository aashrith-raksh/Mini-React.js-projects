import { useEffect, useState } from "react";
console.log("\n\ntimer.jsx render\n--------------------\n");

export default function Timer({ onTimeOut, timeOut }) {
  console.log("\n\n------ Timer Component Render ----------");

  const [timeRemaining, setTimeRemaining] = useState(timeOut);

  useEffect(() => {
    console.log("\nSETTING TIMEOUT");
    const questionTimer = setTimeout(onTimeOut, timeOut);
    return () => {
      console.log("CLEARING TIMOUT");
      clearTimeout(questionTimer);
    };
  }, [onTimeOut, timeOut]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1000);
    }, 1000);

    return () => {
      console.log("CLEARING INTERVAL");
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={timeRemaining} max={timeOut} />;
}

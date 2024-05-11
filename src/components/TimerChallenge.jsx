import { useRef, useState } from "react";
import {ResultScreen} from "./ResultScreen";

export default function TimerChallenge({ title, targetTime }) {
  // HOOKS
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  // REFS
  const timer = useRef();
  const resultScreenRef = useRef();

  //   FUNCTIONS
  function handleStartChallenge() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      resultScreenRef.current.showModal();
    }, targetTime * 1000);
  }

  function handleStopChallenge() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }

  // RETURN
  return (
    <>
      <ResultScreen result={"lost"} targetTime={targetTime} ref={resultScreenRef}/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            onClick={timerStarted ? handleStopChallenge : handleStartChallenge}
          >
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>

        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Timer is running" : "Timer is Inactive"}
        </p>
      </section>
    </>
  );

  //
}

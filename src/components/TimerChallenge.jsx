import { useRef, useState } from "react";
import {ResultScreen} from "./ResultScreen";

export default function TimerChallenge({ title, targetTime }) {
  // HOOKS
  // const [timerExpired, setTimerExpired] = useState(false);
  // const [timerStarted, setTimerStarted] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000

  
  // REFS
  const timer = useRef();
  const resultScreenRef = useRef();

  //   FUNCTIONS

  if(timeRemaining <=0){
    clearInterval(timer.current)
    resultScreenRef.current.open();
  }

  function restartGame(){
    setTimeRemaining(targetTime*1000)
  }

  function handleStartChallenge() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 100)
    }, 100);
  }

  function handleStopChallenge() {
    clearInterval(timer.current);
    resultScreenRef.current.open();
  }

  // RETURN
  return (
    <>
      <ResultScreen timeRemaining = {timeRemaining} onReset={restartGame} targetTime={targetTime*1000} ref={resultScreenRef}/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            onClick={timerIsActive ? handleStopChallenge : handleStartChallenge}
          >
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>

        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running" : "Timer is Inactive"}
        </p>
      </section>
    </>
  );

  //
}

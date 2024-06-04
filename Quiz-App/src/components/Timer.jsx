import { useEffect, useState } from "react";
console.log('\n\ntimer.jsx render\n--------------------\n')

export default function Timer({ onTimeOut, timeOut }) {
    console.log('\n\n------ Timer Component Render ----------')

  const [timeRemaining, setTimeRemaining] = useState(timeOut)

  useEffect(() =>{
    console.log('timeout set')
      const questionTimer = setTimeout(onTimeOut, timeOut);
      return () => {
        console.log('timer cleared')
        clearTimeout(questionTimer)}
  }, [onTimeOut, timeOut])

  useEffect(() => {
    console.log('interval set')
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1000);
    }, 1000);

    return () => {
        console.log('interval cleared')
        clearInterval(interval)
    }
  }, []);

  return <progress id="question-time" value={timeRemaining} max={timeOut}/>;
}

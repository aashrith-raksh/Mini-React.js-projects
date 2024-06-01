import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [timeRemaining, setTimeRemaining] = useState(TIMER);

  // effect for setting time remaining
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // effect for setting the timout for choosing the option
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      console.log('timer cleared')
      clearTimeout(timer);
    };
  },[]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={timeRemaining} max={TIMER} />
    </div>
  );
}

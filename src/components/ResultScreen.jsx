// import {} from 're'

import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export const ResultScreen = forwardRef(
function({targetTime, timeRemaining, onReset}, ref) {

  const dialogRef = useRef();

  const youLost = timeRemaining <= 0
  const formattedRemainingTime = (timeRemaining/1000).toFixed(2);
  const formattedTargetTime = (targetTime/1000).toFixed(2);
  const scoreInPercetage = ((1 - (timeRemaining)/targetTime)*100)
  const scoreInAbsoluteValue = Math.round(scoreInPercetage)


  useImperativeHandle(ref, () => {
    return {
      open(){
        dialogRef.current.showModal();
      }
    }
  })

  
  return createPortal(
    <dialog className="result-modal" ref = {dialogRef} onClose={onReset}>
      {youLost && <h2>You Lost</h2>}
      {!youLost && <h2>Your Score: {scoreInAbsoluteValue}</h2>}
      <p>
        Target time was <strong>{formattedTargetTime} second{formattedTargetTime>1?'s':''}</strong>
      </p>
      <p>
        You finished the challenge with <strong>{formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
}
)

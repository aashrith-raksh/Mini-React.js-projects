// import {} from 're'

import { forwardRef, useImperativeHandle, useRef } from "react";

export const ResultScreen = forwardRef(
function({result, targetTime}, ref) {

  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open(){
        dialogRef.current.showModal();
      }
    }
  })

  return (
    <dialog className="result-modal" ref = {dialogRef}>
      <h2>You {result}</h2>
      <p>
        Target time was <strong>{targetTime}</strong>
      </p>
      <p>
        You finished the challenge with <strong>X seconds left</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
)

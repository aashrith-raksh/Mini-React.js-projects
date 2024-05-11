// import {} from 're'

import { forwardRef } from "react";

export const ResultScreen = forwardRef(
function({result, targetTime}, ref) {
  return (
    <dialog className="result-modal" ref = {ref}>
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

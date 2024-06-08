import { useRef } from "react";

export default function Answers({activeQuestion, answerState, onSelect, userAnswers}) {
  let shuffledAnswers = useRef();
  
  if(!shuffledAnswers.current){
    shuffledAnswers.current = [...activeQuestion.answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }


  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = "";

        const isSelected = answer === userAnswers[userAnswers.length - 1];

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

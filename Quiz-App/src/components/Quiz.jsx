import { useState } from "react";
import QUESTIONS from "../../questions";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  /*
        if the user has already answered 5 questoins
        userAnswers contains 5 answers(0 --> 4)

        Hence the next question would be 5
        which is equal to userAnswers.length
    */

  const activeQuestion = QUESTIONS[activeQuestionIndex];

  const shuffledAnswers = [...activeQuestion.answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{activeQuestion.text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

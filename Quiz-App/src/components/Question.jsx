import Answers from "./Answers";
import Timer from "./TImer";

export default function Question({activeQuestion, answerState, userAnswers, onSelect, onTimeOut}){
    return <>
        <Timer
          timeOut={10000}
          onTimeOut={onTimeOut}
        />
        <h2>{activeQuestion.text}</h2>
        <Answers
          activeQuestion={activeQuestion}
          answerState={answerState}
          userAnswers={userAnswers}
          onSelect={onSelect}
        />
    </>
}
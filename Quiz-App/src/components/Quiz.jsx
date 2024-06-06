import { useCallback, useMemo, useRef, useState } from "react";
import QUESTIONS from "../../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Timer from "./TImer";

export default function Quiz() {
  let shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState('');
  if(answerState == '') shuffledAnswers.current = undefined
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = answerState === '' ? userAnswers.length: userAnswers.length -1;
  /*
        if the user has already answered 5 questoins
        userAnswers contains 5 answers(0 --> 4)

        Hence the next question would be 5
        which is equal to userAnswers.length
    */

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    if(selectedAnswer === null){
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
      setAnswerState('');
      return;
    }

    setAnswerState('answered');
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    

    // 1 sec timer after which answer will be set to correct or wrong
    setTimeout(() => {
      if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState('correct');
        // answerState = 'correct'
        }else{
        setAnswerState('wrong');
        // answerState = 'wrong'
      }

      /*
        after 1 sec collapses, 
        answerState will be set to either 'correct' OR 'worng'
        
        Then the below 2 sec timer will be set.
        This will reset the answerState to '' (EMPTY STRING) 
      */
      setTimeout(() => {
        setAnswerState('');
      },1000)
    }, 1000);
  },
  [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg}></img>
        <h2>Quiz is completed</h2>
      </div>
    );
  }

  const activeQuestion = QUESTIONS[activeQuestionIndex];
  if(!shuffledAnswers.current){
    shuffledAnswers.current = [...activeQuestion.answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="question">
        <Timer
          timeOut={10000}
          onTimeOut={handleSkipAnswer}
          key={activeQuestionIndex}
        />
        <h2>{activeQuestion.text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            let cssClass = '';

            const isSelected = answer === userAnswers[userAnswers.length-1];

            if(answerState === 'answered' && isSelected){
              cssClass = 'selected'
            }

            if((answerState === 'correct' || answerState === 'wrong') && isSelected){
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
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
/* eslint-disable no-restricted-globals */
import React, { useState, Fragment } from 'react';

import MultiStepForm, { IQuestionInfo, ClearForm } from './components/MultiStepForm/MultiStepForm';
import { pizzaQuiz } from './ts/api';

import './App.css';

const FORM_NAME = 'pizza_quiz';

function App() {
  const [quizAnswers, setQuizAnswers] = useState();
  const [quizResult, setQuizResult] = useState<string>();

  const onComplete = (newQuizAnswers: IQuestionInfo[]) => {
    setQuizAnswers(quizAnswers)
    // Send server quiz result
    setQuizResult('Cheese Pizza')
  };

  return (
    <div className="App">
      <h1>Pizza Quiz</h1>
      {quizResult == null ? (
        <MultiStepForm name={FORM_NAME} getNextState={pizzaQuiz} onComplete={onComplete} />
      ) : (
        <Fragment>
          <h4>You should get {quizResult}!</h4>
          <button onClick={() => {ClearForm(FORM_NAME); location.reload()}}>Restart</button>
        </Fragment>
      )}
    </div>
  );
}

export default App;

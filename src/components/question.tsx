import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setChoosenQuestionIndex, setResult } from '../store/rootReducer';
import { Answer, ReduxState, QuestionsObject } from '../types';
import '../styles/question.scss';
import '../styles/side.scss';

interface Props {
  updateChoosenQuestionIndex: Function,
  updateResult: Function
  questions: QuestionsObject[],
  choosenQuestionIndex: number,
  setSideBarIsOpen?: Function,
  screenWidth?: number
}
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

const Question = ({
  choosenQuestionIndex, questions, updateChoosenQuestionIndex, updateResult, setSideBarIsOpen, screenWidth,
}: Props): JSX.Element => {
  const [choosenAnswer, setChoosenAnswer] = useState<Answer | null>(null);
  const [endTimeOut, setEndTimeOut] = useState<boolean>(false);
  const [disable, setDisable] = useState(false);

  const history = useHistory();

  const chooseVariant = (answer: Answer) => {
    setChoosenAnswer(answer);
    setDisable(true);
  };

  const showNextStep = (correct: boolean, index: number) => {
    if (correct && index !== questions.length - 1) {
      setChoosenAnswer(null);
      setEndTimeOut(false);
      setDisable(false);
      updateChoosenQuestionIndex(index + 1);
    } else if (!correct || index === questions.length - 1) {
      if (!correct) {
        index === 0
          ? updateResult('0')
          : updateResult(questions[index - 1].cost);
      } else {
        updateResult(questions[index].cost);
      }
      history.push('final');
    }
  };

  const currentQuestion = questions[choosenQuestionIndex];
  const desktopScreen = screenWidth && screenWidth >= 1360;
  return (
    <div className="question">
      <div className="question__wrapper">
        <div className="question__header">
          <button
            className="question__button"
            type="button"
            onClick={() => setSideBarIsOpen && setSideBarIsOpen(true)}
            aria-label="open sidebar"
          />
        </div>
        <p className="question__text">{currentQuestion && currentQuestion.question}</p>
        <div className="answers">
          {currentQuestion && currentQuestion.answers.map((answer: Answer, i: number) => {
            const currentAnswer = !endTimeOut && choosenAnswer
              && choosenAnswer.value === answer.value;
            const rightAnswer = endTimeOut && choosenAnswer && answer.correct;
            const falseAnswer = endTimeOut
              && choosenAnswer
              && choosenAnswer.value === answer.value
              && !answer.correct;
            const classes = ['answers__value'];

            if (currentAnswer) {
              desktopScreen
                ? classes.push('answers__value--desk-orange')
                : classes.push('answers__value--orange');
            }
            if (rightAnswer) {
              desktopScreen
                ? classes.push('answers__value--desk-green')
                : classes.push('answers__value--green');
            }
            if (falseAnswer) {
              desktopScreen
                ? classes.push('answers__value--desk-red')
                : classes.push('answers__value--red');
            }
            return (
              <button
                className={classes.join(' ')}
                key={answer.value}
                type="button"
                disabled={disable}
                onClick={() => [
                  chooseVariant(answer),
                  setTimeout(setEndTimeOut, 2000, true),
                  setTimeout(showNextStep, 4000,
                    answer.correct, choosenQuestionIndex)]}
              >
                <span className="answers__value__letter">{alphabet[i]}</span>
                <span>{answer.value}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

Question.defaultProps = {
  setSideBarIsOpen: () => { },
  screenWidth: 0,
};

const mapStateToProps = (state: ReduxState) => ({
  choosenQuestionIndex: state.choosenQuestionIndex,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateResult: (value: number) => dispatch((setResult(value))),
  updateChoosenQuestionIndex:
    (value: number) => dispatch(setChoosenQuestionIndex(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Question);

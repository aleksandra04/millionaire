import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setChoosenQuestionIndex, setResult } from '../store/rootReducer';
import { Answer, ReduxState, QuestionsObject } from '../types';

interface Props {
  updateChoosenQuestionIndex: Function,
  updateResult: Function
  questions: QuestionsObject[],
  choosenQuestionIndex: number,
}

const Question = ({
  choosenQuestionIndex, questions, updateChoosenQuestionIndex, updateResult,
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
  return (
    <div>
      <p>{currentQuestion && currentQuestion.question}</p>
      <div>
        {currentQuestion && currentQuestion.answers.map((answer: Answer) => {
          const currentAnswer = !endTimeOut && choosenAnswer
            && choosenAnswer.value === answer.value;
          const rightAnswer = endTimeOut && choosenAnswer && answer.correct;
          const falseAnswer = endTimeOut
            && choosenAnswer
            && choosenAnswer.value === answer.value
            && !answer.correct;

          let style = { color: 'black' };
          if (currentAnswer) {
            style = { color: 'orange' };
          }
          if (rightAnswer) {
            style = { color: 'green' };
          }
          if (falseAnswer) {
            style = { color: 'red' };
          }
          return (
            <button
              key={answer.value}
              type="button"
              style={style}
              disabled={disable}
              onClick={() => [
                chooseVariant(answer),
                setTimeout(setEndTimeOut, 2000, true),
                setTimeout(showNextStep, 4000,
                  answer.correct, choosenQuestionIndex)]}
            >
              {answer.value}
            </button>
          );
        })}
      </div>
    </div>
  );
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

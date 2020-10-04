import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeQuestions } from '../store/rootReducer';
import data from '../appConfig.json';
import { QuestionsObject, ReduxState, StartData } from '../types';
import Question from './question';

interface Props {
  modifyQuestions: Function,
  questions: QuestionsObject[],
  choosenQuestionIndex: number,
  result: [number, string, null]
}

const Game = ({
  modifyQuestions, questions, choosenQuestionIndex, result,
}: Props): JSX.Element => {
  useEffect(() => {
    modifyQuestions(data);
  }, []);

  return (
    <main>
      {!result
        &&
        <div>
          <aside>
            {questions && questions.map((question: QuestionsObject) => {
              const index = questions.indexOf(question);
              let styles;
              if (index < choosenQuestionIndex) { styles = { color: 'gray' }; }
              if (index > choosenQuestionIndex) { styles = { color: 'black' }; }
              if (index === choosenQuestionIndex) { styles = { color: 'red' }; }
              return (
                <p style={styles} key={question.cost}>{`$${question.cost.toLocaleString()}`}</p>
              );
            })}
          </aside>
          <Question />
        </div>}
    </main>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  questions: state.questions,
  choosenQuestionIndex: state.choosenQuestionIndex,
  result: state.result,
});

const mapDispatchToProps = (dispatch: Function) => ({
  modifyQuestions: (value: StartData) => dispatch(changeQuestions(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

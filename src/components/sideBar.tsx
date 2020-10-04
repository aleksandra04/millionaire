import React from 'react';
import { connect } from 'react-redux';
import { setChoosenQuestionIndex, setResult } from '../store/rootReducer';
import { ReduxState, QuestionsObject } from '../types';
import '../styles/side.scss';
import '../styles/question.scss';

interface Props {
  questions: QuestionsObject[],
  choosenQuestionIndex: number,
  setSideBarIsOpen?: Function,
  screenWidth?: number
}

const SideBar = ({
  choosenQuestionIndex, questions, setSideBarIsOpen, screenWidth,
}: Props): JSX.Element => {
  const revertQuestopn = [...questions].reverse();
  return (
    <div className="side">
      <div className="side__header">
        <button
          className="side__button"
          type="button"
          onClick={() => setSideBarIsOpen && setSideBarIsOpen(false)}
          aria-label="close sidebar"
        />
      </div>
      <aside className="side__prices">
        {revertQuestopn && revertQuestopn.map((question: QuestionsObject) => {
          const index = questions.indexOf(question);
          const classes = ['side__price'];

          if (index < choosenQuestionIndex) { classes.push('side__price--gray'); }
          if (index === choosenQuestionIndex) { classes.push('side__price--orange'); }
          if (index === choosenQuestionIndex && screenWidth && screenWidth >= 700) { classes.push('side__price--desktop'); }
          return (
            <p key={question.cost} className={classes.join(' ')}>
              {`$${question.cost.toLocaleString()}`}
            </p>
          );
        })}
      </aside>
    </div>
  );
};

SideBar.defaultProps = {
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
)(SideBar);

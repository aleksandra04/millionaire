import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { changeQuestions } from '../store/rootReducer';
import data from '../appConfig.json';
import { ReduxState, StartData } from '../types';
import Question from './question';
import SideBar from './sideBar';
import '../styles/play.scss';

interface Props {
  modifyQuestions: Function,
}

const Play = ({ modifyQuestions }: Props): JSX.Element => {
  const ref = useRef<HTMLHeadingElement>(null);

  const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(ref.current && ref.current.clientWidth);

  useEffect(() => {
    modifyQuestions(data);
    setScreenWidth(ref.current && ref.current.clientWidth);
  }, []);

  const debounce = (fn: Function, timeout: number) => {
    let timeoutID = -1;
    return () => {
      if (timeoutID > -1) {
        window.clearTimeout(timeoutID);
      }
      timeoutID = window.setTimeout(fn, timeout);
    };
  };

  const updateScreenWidth = () => {
    setScreenWidth(ref.current && ref.current.clientWidth);
  };

  const onResize = debounce(updateScreenWidth, 20);

  window.addEventListener('resize', onResize);

  const mobileScreen = !sideBarIsOpen
    ? <Question setSideBarIsOpen={setSideBarIsOpen} />
    : <SideBar setSideBarIsOpen={setSideBarIsOpen} />;

  return (
    <main className="play" ref={ref}>
      {screenWidth && screenWidth >= 800 &&
        <div className="play__wrapper">
          <Question screenWidth={screenWidth} />
          <SideBar screenWidth={screenWidth} />
        </div>}
      {screenWidth && screenWidth < 800 &&
        mobileScreen}
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
)(Play);

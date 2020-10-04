import {
  StartData, StartAnswer, Action, QuestionsObject,
} from '../types';

import * as types from './actionTypes';

export const setQuestions = (value: QuestionsObject[]) => ({
  type: types.GET_QUESTIONS,
  payload: value,
});

export const setChoosenQuestionIndex = (value: number) => ({
  type: types.SET_CHOOSEN_QUESTION_INDEX,
  payload: value,
});

export const setResult = (value: number | string | null) => ({
  type: types.SET_RESULT,
  payload: value,
});

export const changeQuestions = (data: StartData) => (dispatch: Function) => {
  const arr = data.data.map((el) => {
    const question = el.questions[Math.floor(Math.random()
            * el.questions.length)];
    const answers = question.answers.map((answer: StartAnswer) => ({
      value: answer.value,
      correct: answer.correct,
      choosen: null,
    }));
    const result = {
      question: question.question,
      answers,
      cost: el.price,
    };
    return result;
  }).sort((a, b) => a.cost - b.cost);

  dispatch(setQuestions(arr));
  dispatch(setChoosenQuestionIndex(0));
  dispatch(setResult(null));
};

const initialState = {
  questions: [],
  choosenQuestionIndex: null,
  result: null,
};

export const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case types.SET_CHOOSEN_QUESTION_INDEX:
      return {
        ...state,
        choosenQuestionIndex: action.payload,
      };
    case types.SET_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};

export interface QuestionsObject {
  question: string;
  answers: Answer[];
  cost: number,
}

export interface Answer {
  value: string;
  correct: boolean;
}

export interface StartData {
  data: PriceObject[]
}

export interface PriceObject {
  price: number,
  questions: StartQuestionObject[]
}

export interface StartAnswer {
  value: string;
  correct: boolean;
}

export interface StartQuestionObject {
  question: string;
  answers: StartAnswer[];

}

export interface Action {
  type: string,
  payload?: number | string | null | any,
}

export interface ReduxState {
  questions: QuestionsObject[],
  choosenQuestionIndex: number,
  result: any,
}

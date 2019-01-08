import * as types from '../../actionTypes/answer';

const initialState = {
  loading: false,
  error: null,
  answer: null,
  answers: [],
};

const postAnswer = (state = initialState, action) => {
  switch (action.type) {
  case types.ANSWER_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.ANSWER_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      answer: action.payload,
    };
  case types.ANSWER_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case types.GET_ANSWERS_BEGIN:
    return {
      ...state,
      loading: true,
      error: null,
      answer: null,
    };
  case types.GET_ANSWERS_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      answers: action.payload,
    };

  case types.GET_ANSWERS_ERROR:
    return {
      loading: false,
      error: action.payload,
      answers: null,
      answer: null,
    };
  default:
    return state;
  }
};

export default postAnswer;

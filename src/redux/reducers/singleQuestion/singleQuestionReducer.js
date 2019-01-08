import {
  LOAD_SINGLE_QUESTION_BEGIN,
  LOAD_SINGLE_QUESTION_SUCCESS,
  LOAD_SINGLE_QUESTION_ERROR,
  DELETE_QUESTION_BEGIN,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
} from '../../actionTypes/singleQuestion';

const initialState = {
  question: null,
  loading: false,
  error: null,
};

const singleQuestionReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_SINGLE_QUESTION_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case LOAD_SINGLE_QUESTION_SUCCESS:
    return {
      ...state,
      loading: false,
      question: action.payload,
      error: null,
    };
  case LOAD_SINGLE_QUESTION_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case DELETE_QUESTION_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case DELETE_QUESTION_SUCCESS:
    return {
      ...state,
      question: action.payload,
      error: null,
      loading: false,
    };
  case DELETE_QUESTION_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  default:
    return state;
  }
};

export default singleQuestionReducer;

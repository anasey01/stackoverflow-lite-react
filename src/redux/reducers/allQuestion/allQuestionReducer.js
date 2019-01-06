import {
  LOAD_ALL_QUESTION_BEGIN,
  LOAD_ALL_QUESTION_SUCCESS,
  LOAD_ALL_QUESTION_ERROR,
} from '../../actionTypes/allQuestions';

const initialState = {
  loading: false,
  articles: null,
  error: null,
};

const getQuestions = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_ALL_QUESTION_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case LOAD_ALL_QUESTION_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      articles: action.payload,
    };
  case LOAD_ALL_QUESTION_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  default:
    return state;
  }
};

export default getQuestions;

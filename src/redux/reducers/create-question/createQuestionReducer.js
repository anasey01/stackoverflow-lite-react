import {
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
} from '../../actionTypes/createQuestion';

const initialState = {
  error: null,
  article: null,
  loading: false,
};

const createQuestion = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_QUESTION_BEGIN:
    return {
      ...state,
      loading: true,
    };

  case CREATE_QUESTION_SUCCESS:
    return {
      ...state,
      article: action.payload,
      error: null,
      loading: false,
    };

  case CREATE_QUESTION_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default createQuestion;

import axios from 'axios';
import store from '../../store';
import {
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
} from '../../actionTypes/createQuestion';

export const triggerCreateQuestion = () => ({
  type: CREATE_QUESTION_BEGIN,
});

export const createQuestionSuccess = question => ({
  type: CREATE_QUESTION_SUCCESS,
  payload: question,
});

export const createQuestionError = error => ({
  type: CREATE_QUESTION_ERROR,
  payload: error,
});

export const createQuestion = (question) => {
  const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions';
  const tokens = store.getState();

  const loginToken = tokens.loginReducer.token;
  const signupToken = tokens.signupReducer.token;
  const token = loginToken || signupToken;

  return (dispatch) => {
    return axios({
      method: 'POST',
      url,
      data: question,
      headers: {
        'x-auth-token': token,
      }
    })
      .then((response) => {
        dispatch(createQuestionSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createQuestionError(error.response.data));
        return error.response.data;
      });
  };
};

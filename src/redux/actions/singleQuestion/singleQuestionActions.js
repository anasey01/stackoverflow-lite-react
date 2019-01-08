import axios from 'axios';
import store from '../../store';
import {
  LOAD_SINGLE_QUESTION_BEGIN,
  LOAD_SINGLE_QUESTION_SUCCESS,
  LOAD_SINGLE_QUESTION_ERROR,
  DELETE_QUESTION_BEGIN,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
} from '../../actionTypes/singleQuestion';

export const loadSingleQuestionRequest = () => {
  return { type: LOAD_SINGLE_QUESTION_BEGIN };
};

export const loadSingleQuestionSuccess = (question) => {
  return {
    type: LOAD_SINGLE_QUESTION_SUCCESS,
    payload: question,
  };
};

export const loadSingleQuestionError = (error) => {
  return {
    type: LOAD_SINGLE_QUESTION_ERROR,
    payload: error,
  };
};

export const deleteQuestionBegin = () => {
  return {
    type: DELETE_QUESTION_BEGIN,
  };
};

export const deleteQuestionSuccess = (question) => {
  return {
    type: DELETE_QUESTION_SUCCESS,
    payload: question,
  };
};

export const deleteQuestionError = (error) => {
  return {
    type: DELETE_QUESTION_ERROR,
    payload: error,
  };
};

export const loadQuestion = (questionId) => {
  return (dispatch) => {
    dispatch(loadSingleQuestionRequest());

    const url = `https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions/${questionId}`;
    const tokens = store.getState();

    const loginToken = tokens.loginReducer.token;
    const signupToken = tokens.signupReducer.token;
    const token = loginToken || signupToken;

    return axios({
      url,
      method: 'GET',
      headers: {
        'x-auth-token': token,
      }
    })
      .then((response) => {
        dispatch(loadSingleQuestionSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(loadSingleQuestionError(error.response.data));
        return error.response.data;
      });
  };
};

export const deleteQuestion = (questionId) => {
  return (dispatch) => {
    const url = `https://anasey-stackoverflow-lite.herokuapp.com/api/v1/question/${questionId}`;
    const tokens = store.getState();

    const loginToken = tokens.loginReducer.token;
    const signupToken = tokens.signupReducer.token;
    const token = loginToken || signupToken;
    dispatch(deleteQuestionBegin());
    return axios({
      url,
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
      }
    })
      .then((response) => {
        dispatch(deleteQuestionSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteQuestionError(error.response.data));
        return error.response.data;
      });
  };
};

import axios from 'axios';
import store from '../../store/index';
import {
  ANSWER_BEGIN,
  ANSWER_SUCCESS,
  ANSWER_ERROR,
  GET_ANSWERS_BEGIN,
  GET_ANSWERS_SUCCESS,
  GET_ANSWERS_ERROR,
  UPDATE_ANSWER_BEGIN,
  UPDATE_ANSWER_SUCCESS,
  UPDATE_ANSWER_ERROR,
} from '../../actionTypes/answer';

export const triggerAnswerBegin = () => ({
  type: ANSWER_BEGIN,
});

export const answerSuccess = answer => ({
  type: ANSWER_SUCCESS,
  payload: answer,
});

export const answerError = error => ({
  type: ANSWER_ERROR,
  payload: error,
});

export const triggerGetAnswers = () => ({
  type: GET_ANSWERS_BEGIN,
});

export const getAnswersSuccess = answers => ({
  type: GET_ANSWERS_SUCCESS,
  payload: answers,
});

export const getAnswersError = error => ({
  type: GET_ANSWERS_ERROR,
  payload: error,
});

export const triggerUpdateAnswer = () => ({
  type: UPDATE_ANSWER_BEGIN,
});

export const updateAnswerSuccess = answer => ({
  type: UPDATE_ANSWER_SUCCESS,
  payload: answer,
});

export const updateAnswerError = error => ({
  type: UPDATE_ANSWER_ERROR,
  payload: error,
});

export const postAnswer = (questionId, answer) => {
  const tokens = store.getState();

  const loginToken = tokens.loginReducer.token;
  const signupToken = tokens.signupReducer.token;
  const token = loginToken || signupToken;

  return (dispatch) => {
    const url = `https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions/${questionId}/answers`;
    dispatch(triggerAnswerBegin());
    return axios({
      method: 'POST',
      url,
      headers: {
        'x-auth-token': token,
      },
      data: {
        answer,
      },
    })
      .then((response) => {
        dispatch(answerSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(answerError(error.response.data));
        return error.response.data;
      });
  };
};

export const getAllAnswers = (questionId) => {
  const tokens = store.getState();

  const loginToken = tokens.loginReducer.token;
  const signupToken = tokens.signupReducer.token;
  const token = loginToken || signupToken;

  return (dispatch) => {
    const url = `https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions/${questionId}/`;
    dispatch(triggerGetAnswers());
    return axios({
      method: 'GET',
      url,
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => {
        dispatch(getAnswersSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAnswersError(error.response.data));
        return error.response.data;
      });
  };
};

export const updateAnswer = (questionId, answerId, answer) => {
  const tokens = store.getState();

  const loginToken = tokens.loginReducer.token;
  const signupToken = tokens.signupReducer.token;
  const token = loginToken || signupToken;

  return (dispatch) => {
    const url = `https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions/${questionId}/answers/${answerId}`;
    dispatch(triggerUpdateAnswer());
    return axios({
      method: 'PUT',
      url,
      headers: {
        'x-auth-token': token,
      },
      data: {
        answer,
      },
    })
      .then((response) => {
        dispatch(updateAnswerSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(error.response.data);
        return error.response.data;
      });
  };
};

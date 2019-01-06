import axios from 'axios';
import {
  LOAD_ALL_QUESTION_BEGIN,
  LOAD_ALL_QUESTION_ERROR,
  LOAD_ALL_QUESTION_SUCCESS,
} from '../../actionTypes/allQuestions';

export const triggerGetAllArticles = () => ({
  type: LOAD_ALL_QUESTION_BEGIN,
});

export const getAllArticleSuccess = articles => ({
  type: LOAD_ALL_QUESTION_SUCCESS,
  payload: articles,
});

export const getAllArticleError = error => ({
  type: LOAD_ALL_QUESTION_ERROR,
  payload: error,
});

export const getAllQuestion = () => {
  const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions';
  return (dispatch) => {
    dispatch(triggerGetAllArticles());
    return axios.get(url)
      .then((response) => {
        dispatch(getAllArticleSuccess(response.data.questions));
        return response.data.questions;
      })
      .catch((error) => {
        dispatch(getAllArticleError(error.response));
        return error.response;
      });
  };
};

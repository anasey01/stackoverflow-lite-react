import axios from 'axios';
import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../../actionTypes/signup';

export const signupBegin = () => ({
  type: SIGNUP_BEGIN,
});

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupError = error => ({
  type: SIGNUP_ERROR,
  payload: error,
});

export const signupRequest = (user) => {
  return (dispatch) => {
    dispatch(signupBegin());
    const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/signup';
    return axios.post(url, user)
      .then((response) => {
        dispatch(signupSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(signupError(error.response.data));
        return error.response.data;
      });
  };
};

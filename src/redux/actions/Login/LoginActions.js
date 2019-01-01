import axios from 'axios';
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
} from '../../actionTypes/login';

export const loginBegin = () => ({
  type: LOGIN_BEGIN
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT_USER,
});

export const loginRequest = (user) => {
  return (dispatch) => {
    dispatch(loginBegin());

    const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/login';
    return axios.post(url, user)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(loginError(error.response.data));
        return error.response.data;
      });
  };
};

export const logoutRequest = (dispatch) => {
  dispatch(logout());
};

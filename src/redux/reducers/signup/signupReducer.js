import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../../actionTypes/signup';
import { LOGOUT_USER } from '../../actionTypes/login';


let initialState;

try {
  const persistedLogin = JSON.parse(localStorage.getItem('signup'));
  if (persistedLogin) {
    initialState = persistedLogin;
  } else {
    initialState = {
      loading: false,
      success: false,
      error: null,
      token: null,
      user: null,
      username: null,
    };
  }
} catch (error) { /** do nothing */ }

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNUP_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case SIGNUP_SUCCESS:
    return {
      ...state,
      loading: false,
      success: true,
      error: null,
      token: action.payload.token,
      user: action.payload.user,
      username: action.payload.user.username,
    };
  case SIGNUP_ERROR:
    return {
      ...state,
      success: false,
      error: action.payload,
      user: null,
      token: null,
      loading: false,
      username: null,
    };
  case LOGOUT_USER:
    return {
      ...state,
      user: null,
      token: null,
      loading: false,
      username: null,
    };
  default:
    return state;
  }
};

export default signupReducer;

import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
} from '../../actionTypes/login';

let initialState;

try {
  const persistedLogin = JSON.parse(localStorage.getItem('login'));
  if (persistedLogin) {
    initialState = persistedLogin;
  } else {
    initialState = {
      loading: false,
      success: false,
      error: null,
      token: null,
      id: null,
    };
  }
} catch (error) { /** do nothing */ }


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_BEGIN:
    return {
      ...state,
      loading: true,
      error: null,
    };

  case LOGIN_SUCCESS:
    return {
      ...state,
      loading: false,
      success: true,
      token: action.payload.token,
      id: action.payload.id,
      error: null,
    };

  case LOGIN_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };

  case LOGOUT_USER:
    return {
      ...state,
      success: true,
      loading: false,
      token: null,
      id: null,
    };

  default:
    return state;
  }
};

export default loginReducer;

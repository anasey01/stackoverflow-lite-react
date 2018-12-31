import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../../actionTypes/signup';

const initialState = {
  loading: false,
  success: false,
  error: null,
  token: null,
  user: null,
};

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
    };
  case SIGNUP_ERROR:
    return {
      ...state,
      success: false,
      error: action.payload,
      user: null,
      token: null,
      loading: false,
    };
  default:
    return state;
  }
};

export default signupReducer;

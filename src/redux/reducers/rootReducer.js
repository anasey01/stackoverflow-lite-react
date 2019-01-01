import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import createQuestionReducer from './create-question/createQuestionReducer';

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  createQuestionReducer,
});

export default rootReducer;

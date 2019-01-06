import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import createQuestionReducer from './create-question/createQuestionReducer';
import singleQuestionReducer from './singleQuestion/singleQuestionReducer';
import allQuestionReducer from './allQuestion/allQuestionReducer';

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  createQuestionReducer,
  singleQuestionReducer,
  allQuestionReducer,
});

export default rootReducer;

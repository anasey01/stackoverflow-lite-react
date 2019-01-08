import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import createQuestionReducer from './create-question/createQuestionReducer';
import singleQuestionReducer from './singleQuestion/singleQuestionReducer';
import allQuestionReducer from './allQuestion/allQuestionReducer';
import postAnswerReducer from './answer/answerReducer';

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  createQuestionReducer,
  singleQuestionReducer,
  allQuestionReducer,
  postAnswerReducer,
});

export default rootReducer;

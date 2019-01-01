import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
});

export default rootReducer;

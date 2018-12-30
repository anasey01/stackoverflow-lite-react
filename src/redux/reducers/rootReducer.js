import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';

const rootReducer = combineReducers({
  signupReducer,
});

export default rootReducer;

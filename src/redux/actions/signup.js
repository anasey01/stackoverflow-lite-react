import SIGNUP_USER from '../constants/action-types';

const signupUser = user => ({ type: SIGNUP_USER, payload: user });

export default signupUser
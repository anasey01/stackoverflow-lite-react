import store from '../../redux/store/index';

const isAuthenticated = () => {
  try {
    if (store.getState().signupReducer.token) return true;
  } catch (error) { /* do nothing */ }
  return false;
};

export default isAuthenticated;

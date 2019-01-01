
const isAuthenticated = () => {
  try {
    const localStore = localStorage.getItem('store');
    const signupToken = localStore.signupReducer.token;
    const loginToken = localStore.loginReducer.token;
    if (signupToken || loginToken) return true;
  } catch (error) { /* do nothing */ }
  return false;
};

export default isAuthenticated;

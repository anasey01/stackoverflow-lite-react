
const isAuthenticated = () => {
  try {
    const login = JSON.parse(localStorage.getItem('login'));
    const signup = JSON.parse(localStorage.getItem('signup'));
    const signupToken = signup.token;
    const loginToken = login.token;
    if (signupToken || loginToken) return true;
  } catch (error) { /* do nothing */ }
  return false;
};

export default isAuthenticated;

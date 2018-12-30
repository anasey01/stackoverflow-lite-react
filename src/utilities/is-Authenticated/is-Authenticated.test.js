import * as actions from '../../redux/actions/signup/signupAction';
import store from '../../redux/store/index';
import isAuthenticated from './isAuthenticated';

describe('isLoggedAuthenticated works as expected', () => {
  it('should return true when a token exists', () => {
    store.dispatch(actions.signupSuccess({ id: 'id', token: 'token' })); // login fake user
    expect(isAuthenticated()).toBe(true);
  });
});

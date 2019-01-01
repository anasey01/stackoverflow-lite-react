import * as actions from '../../redux/actions/signup/signupAction';
import store from '../../redux/store/index';
import isAuthenticated from './isAuthenticated';

describe('isLoggedAuthenticated works as expected', () => {
  it('should return false when a token does not exist', () => {
    store.dispatch(actions.signupSuccess({ id: 'id', token: 'token' })); // login fake user
    expect(isAuthenticated()).toBe(false);
  });
});

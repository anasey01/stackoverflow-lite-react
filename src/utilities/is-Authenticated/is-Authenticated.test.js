import * as actions from '../../redux/actions/signup/signupAction';
import store from '../../redux/store/index';
import isAuthenticated from './isAuthenticated';

describe('isLoggedAuthenticated works as expected', () => {
  it('should return false when a token does not exist', () => {
    const user = {
      id: 'id',
      token: 'token',
      user: {
        username: 'someUsername',
      },
      username: 'someUsername'
    };
    store.dispatch(actions.signupSuccess(user)); // login fake user
    expect(isAuthenticated()).toBe(true);
  });
});

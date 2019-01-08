import loginReducer from './loginReducer';
import * as types from '../../actionTypes/login';

const state = {
  loading: false,
  success: false,
  error: null,
  token: null,
  id: null,
  username: null,
};

describe('login reducer test', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(state);
  });

  it('should handle LOGIN_BEGIN', () => {
    state.loading = true;

    expect(loginReducer(state, {
      type: types.LOGIN_BEGIN,
    })).toEqual(state);
  });

  it('should handle LOGIN_SUCCESS', () => {
    state.loading = false;
    state.success = true;
    state.id = 'something';
    state.token = 'token';
    state.username = 'oluseyi';

    expect(loginReducer(state, {
      type: types.LOGIN_SUCCESS,
      payload: {
        id: 'something',
        token: 'token',
        username: 'oluseyi',
      },
    })).toEqual(state);
  });

  it('should handle LOGIN_ERROR', () => {
    state.loading = false;
    state.success = false;
    state.id = null;
    state.token = null;
    state.error = 'error';
    state.username = null;

    expect(loginReducer(state, {
      type: types.LOGIN_ERROR,
      payload: 'error'
    })).toEqual(state);
  });
});

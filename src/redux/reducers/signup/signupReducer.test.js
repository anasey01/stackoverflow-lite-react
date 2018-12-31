import reducer from './signupReducer';
import * as types from '../../actionTypes/signup';

describe('signup reducers', () => {
  const state = {
    loading: false,
    success: false,
    error: null,
    token: null,
    user: null,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle SIGNUP_BEGIN', () => {
    state.loading = true;
    expect(reducer(state, {
      type: types.SIGNUP_BEGIN
    })).toEqual(state);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.token = 'gvbjuihgvhbyfyhoi8y88huy87';
    state.user = 'oluseyi';
    state.success = true;
    expect(reducer(state, {
      type: types.SIGNUP_SUCCESS,
      payload: {
        token: 'gvbjuihgvhbyfyhoi8y88huy87',
        user: 'oluseyi',
      },
    })).toEqual(state);
  });

  it('should handle SIGNUP_ERROR', () => {
    state.loading = false;
    state.error = 'Some Error Message';
    state.user = null;
    state.token = null;
    state.success = false;
    expect(reducer(state, {
      type: types.SIGNUP_ERROR,
      payload: 'Some Error Message',
    })).toEqual(state);
  });
});

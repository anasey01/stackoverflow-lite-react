import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './LoginActions';
import * as types from '../../actionTypes/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('login actions test', () => {
  it('should handle LOGIN_BEGIN', () => {
    expectedAction.type = types.LOGIN_BEGIN;
    expect(actions.loginBegin()).toEqual(expectedAction);
  });

  it('should handle LOGIN_SUCCESS', () => {
    expectedAction.type = types.LOGIN_SUCCESS;
    expectedAction.payload = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(actions.loginSuccess({ foo: 'foo', bar: 'bar' }))
      .toEqual(expectedAction);
  });

  it('should handle LOGIN_ERROR', () => {
    expectedAction.type = types.LOGIN_ERROR;
    expectedAction.payload = 'error';
    expect(actions.loginError('error'))
      .toEqual(expectedAction);
  });

  describe('login actions test', () => {
    const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/login';
    it('should dispatch LOGIN_BEGIN and LOGIN_SUCCESS when loginRequest is successful', () => {
      const mock = new MockAdapter(axios);
      const mockData = {
        username: 'anasey001',
        password: 'password12',
      };
      mock
        .onPost(url)
        .reply(200, mockData);

      const user = {
        email: 'oluseyi@email.com',
        password: 'password',
      };

      const expectedActions = [
        { type: types.LOGIN_BEGIN },
        {
          type: types.LOGIN_SUCCESS,
          payload: {
            username: 'anasey001',
            password: 'password12',
          }
        },
      ];

      const store = mockStore({ user: {} });
      return store.dispatch(actions.loginRequest(user)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch LOGIN_BEGIN and LOGIN_ERROR when loginRequest fails', () => {
      const mock = new MockAdapter(axios);
      const mockData = {
        username: 'anasey001',
        password: 'password12',
      };
      mock
        .onPost(url)
        .reply(400, mockData);

      const user = {
        email: 'oluseyi@email.com',
        password: 'password',
      };

      const expectedActions = [
        { type: types.LOGIN_BEGIN },
        {
          type: types.LOGIN_ERROR,
          payload: {
            username: 'anasey001',
            password: 'password12',
          }
        },
      ];

      const store = mockStore({ user: {} });
      return store.dispatch(actions.loginRequest(user)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

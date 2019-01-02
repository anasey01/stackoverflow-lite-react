import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './signupAction';
import * as types from '../../actionTypes/signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signup actions', () => {
  it('should dispatch SIGNUP_BEGIN and SIGNUP_ERROR when signupRequest fails', () => {
    const mock = new MockAdapter(axios);
    mock.onPost('https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/signup')
      .reply(400, { message: 'error' });

    const user = {
      fullname: 'john Doe',
      gender: 'M',
      username: 'johnny',
      password: 'password12',
      email: 'johndoe@email.com'
    };

    const expectedActions = [
      { type: types.SIGNUP_BEGIN },
      { type: types.SIGNUP_ERROR, payload: { message: 'error' } },
    ];
    const store = mockStore({ user: {} });
    return store.dispatch(actions.signupRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch SIGNUP_BEGIN and SIGNUP_SUCCESS when signupRequest is successful', () => {
    const mock = new MockAdapter(axios);

    const mockData = {
      fullname: 'janet Doe',
      username: 'anasey001',
      password: 'password12',
      email: 'Jane@outlook.com',
    };
    mock.onPost()
      .reply(200, mockData);

    const user = {
      fullname: 'janet Doe',
      username: 'anasey001',
      password: 'password12',
      email: 'Jane@outlook.com',
    };

    const expectedActions = [
      { type: types.SIGNUP_BEGIN },
      {
        type: types.SIGNUP_SUCCESS,
        payload: {
          fullname: 'janet Doe',
          username: 'anasey001',
          password: 'password12',
          email: 'Jane@outlook.com',
        }
      },
    ];

    const store = mockStore({ payload: {} });
    return store.dispatch(actions.signupRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

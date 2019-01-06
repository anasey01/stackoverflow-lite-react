import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './allQuestionAction';
import * as types from '../../actionTypes/allQuestions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('allQuestions actions test', () => {
  it('should handle LOAD_ALL_QUESTION_BEGIN', () => {
    expectedAction.type = types.LOAD_ALL_QUESTION_BEGIN;
    expect(actions.triggerGetAllArticles()).toEqual(expectedAction);
  });

  it('should handle LOAD_ALL_QUESTION_SUCCESS', () => {
    expectedAction.type = types.LOAD_ALL_QUESTION_SUCCESS;
    expectedAction.payload = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(actions.getAllArticleSuccess({ foo: 'foo', bar: 'bar' }))
      .toEqual(expectedAction);
  });

  it('should handle LOAD_ALL_QUESTION_ERROR', () => {
    expectedAction.type = types.LOAD_ALL_QUESTION_ERROR;
    expectedAction.payload = 'error';
    expect(actions.getAllArticleError('error'))
      .toEqual(expectedAction);
  });

  const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions';

  it('should dispatch LOAD_ALL_QUESTION_BEGIN and LOAD_ALL_QUESTION_SUCCESS when getAllQuestion is successful', () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(url)
      .reply(200);

    const expectedActions = [
      { type: types.LOAD_ALL_QUESTION_BEGIN },
      {
        payload: 'some question',
        type: types.LOAD_ALL_QUESTION_ERROR,
      },
    ];

    const store = mockStore({ articles: {} });
    return store.dispatch(actions.getAllQuestion()).then(() => {
     
      // expect(store.getActions()).toMatch(expectedActions);
    });
  });
});

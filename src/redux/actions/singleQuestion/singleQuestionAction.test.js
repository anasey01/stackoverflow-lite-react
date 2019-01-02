import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actionTypes/singleQuestion';
import * as actions from './singleQuestionActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SignleQuestionAction Test', () => {
  it('should dispatch LOAD_SINGLE_QUESTION_BEGIN and LOAD_SINGLE_QUESTION_ERROR when loadQuestion fails', () => {
    const mock = new MockAdapter(axios);
    const questionId = 2;
    mock.onGet()
      .reply(400, { message: 'error' });

    const expectedActions = [
      { type: types.LOAD_SINGLE_QUESTION_BEGIN },
      { type: types.LOAD_SINGLE_QUESTION_ERROR, payload: { message: 'error' } },
    ];
    const store = mockStore({ question: {} });
    return store.dispatch(actions.loadQuestion(questionId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch LOAD_SINGLE_QUESTION_BEGIN and LOAD_SINGLE_QUESTION_ERROR when loadQuestion is successful', () => {
    const mock = new MockAdapter(axios);
    const questionId = 2;
    mock.onGet()
      .reply(200, { message: 'success' });

    const expectedActions = [
      { type: types.LOAD_SINGLE_QUESTION_BEGIN },
      { type: types.LOAD_SINGLE_QUESTION_SUCCESS, payload: { message: 'success' } },
    ];
    const store = mockStore({ question: {} });
    return store.dispatch(actions.loadQuestion(questionId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

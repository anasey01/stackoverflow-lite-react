import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './createQuestionActions';
import * as types from '../../actionTypes/createQuestion';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('create question action test', () => {
  it('should handle CREATE_QUESTION_BEGIN', () => {
    expectedAction.type = types.CREATE_QUESTION_BEGIN;
    expect(actions.triggerCreateQuestion()).toEqual(expectedAction);
  });

  it('should handle CREATE_QUESTION_SUCCESS', () => {
    expectedAction.type = types.CREATE_QUESTION_SUCCESS;
    expectedAction.payload = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(actions.createQuestionSuccess({ foo: 'foo', bar: 'bar' }))
      .toEqual(expectedAction);
  });

  it('should handle CREATE_QUESTION_ERROR', () => {
    expectedAction.type = types.CREATE_QUESTION_ERROR;
    expectedAction.payload = 'error';
    expect(actions.createQuestionError('error'))
      .toEqual(expectedAction);
  });

  // describe('createQuesion actions test', () => {
  //   const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions';
  //   it('should dispatch CREATE_QUESTION_BEGIN and CREATE_QUESTION_SUCCESS when createQuestionSuccess is successful', () => {
  //     const mock = new MockAdapter(axios);
  //     const mockData = {
  //       questionTitle: 'Title of question',
  //       questionContent: 'Some content',
  //     };
  //     mock
  //       .onPost(url)
  //       .reply(200, mockData);

  //     const question = {
  //       questionTitle: 'Title of question',
  //       questionContent: 'Some content',
  //     };

  //     const expectedActions = [
  //       { type: types.CREATE_QUESTION_BEGIN },
  //       {
  //         type: types.CREATE_QUESTION_SUCCESS,
  //         payload: {
  //           questionTitle: 'Title of question',
  //           questionContent: 'Some content',
  //         }
  //       },
  //     ];

  //     const store = mockStore({ question: {} });
  //     return store.dispatch(actions.createQuestion(question)).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });

  //   it('should dispatch CREATE_QUESTION_BEGIN and CREATE_QUESTION_SUCCESS createQuestionSuccess fails', () => {
  //     const mock = new MockAdapter(axios);
  //     const mockData = {
  //       questionTitle: 'Title of question',
  //       questionContent: 'Some content',
  //     };
  //     mock
  //       .onPost(url)
  //       .reply(400, mockData);

  //     const question = {
  //       questionTitle: 'Title of question',
  //       questionContent: 'Some content',
  //     };

  //     const expectedActions = [
  //       { type: types.CREATE_QUESTION_BEGIN },
  //       {
  //         type: types.CREATE_QUESTION_ERROR,
  //         payload: {
  //           questionTitle: 'Title of question',
  //           questionContent: 'Some content',
  //         }
  //       },
  //     ];

  //     const store = mockStore({ question: {} });
  //     return store.dispatch(actions.createQuestion(question)).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });
  // });
});

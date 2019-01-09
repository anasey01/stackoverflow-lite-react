import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './answerActions';
import * as types from '../../actionTypes/answer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('Answer Action', () => {
  it('should handle ANSWER_BEGIN', () => {
    expectedAction.type = types.ANSWER_BEGIN;
    expect(actions.triggerAnswerBegin()).toEqual(expectedAction);
  });

  it('should handle ANSWER_SUCCESS', () => {
    expectedAction.type = types.ANSWER_SUCCESS;
    expectedAction.payload = {
      answer: 'some answer',
    };
    expect(actions.answerSuccess({ answer: 'some answer' })).toEqual(expectedAction);
  });

  it('should handle ANSWER_ERROR', () => {
    expectedAction.type = types.ANSWER_ERROR;
    expectedAction.payload = {
      error: 'some error',
    };
    expect(actions.answerError({ error: 'some error' })).toEqual(expectedAction);
  });

  it('should handle GET_ANSWERS_SUCCESS', () => {
    expectedAction.type = types.GET_ANSWERS_SUCCESS;
    expectedAction.payload = {
      answers: ['some answer'],
    };
    expect(actions.getAnswersSuccess({ answers: ['some answer'] })).toEqual(expectedAction);
  });

  it('should handle UPDATE_ANSWER_BEGIN', () => {
    expectedAction.type = types.UPDATE_ANSWER_BEGIN;
    delete expectedAction.payload;
    expect(actions.triggerUpdateAnswer()).toEqual(expectedAction);
  });

  it('should handle UPDATE_ANSWER_SUCCESS', () => {
    expectedAction.type = types.UPDATE_ANSWER_SUCCESS;
    expectedAction.payload = {
      answer: 'some answer',
    };
    expect(actions.updateAnswerSuccess({ answer: 'some answer' })).toEqual(expectedAction);
  });

  it('should handle UPDATE_ANSWER_ERROR', () => {
    expectedAction.type = types.UPDATE_ANSWER_ERROR;
    expectedAction.payload = {
      error: 'some error',
    };
    expect(actions.updateAnswerError({ error: 'some error' })).toEqual(expectedAction);
  });
});

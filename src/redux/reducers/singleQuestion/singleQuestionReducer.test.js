import reducer from './singleQuestionReducer';
import * as types from '../../actionTypes/singleQuestion';

describe('singleQuestionReducer test', () => {
  const state = {
    question: null,
    loading: false,
    error: null,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle LOAD_SINGLE_QUESTION_BEGIN', () => {
    state.loading = true;
    expect(reducer(state, {
      type: types.LOAD_SINGLE_QUESTION_BEGIN
    })).toEqual(state);
  });

  it('should handle LOAD_SINGLE_QUESTION_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.question = 'some python question';
    state.success = true;
    expect(reducer(state, {
      type: types.LOAD_SINGLE_QUESTION_SUCCESS,
      payload: 'some python question',
    })).toEqual(state);
  });

  it('should handle LOAD_SINGLE_QUESTION_ERROR', () => {
    state.loading = false;
    state.error = 'Some Error Message';
    state.success = false;
    expect(reducer(state, {
      type: types.LOAD_SINGLE_QUESTION_ERROR,
      payload: 'Some Error Message',
    })).toEqual(state);
  });

  it('should handle DELETE_QUESTION_BEGIN', () => {
    state.loading = true;
    expect(reducer(state, {
      type: types.DELETE_QUESTION_BEGIN,
    })).toEqual(state);
  });

  it('should handle DELETE_QUESTION_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.question = { question: 'some question' };
    expect(reducer(state, {
      type: types.DELETE_QUESTION_SUCCESS,
      payload: {
        question: 'some question',
      }
    })).toEqual(state);
  });

  it('should handle DELETE_QUESTION_ERROR', () => {
    state.loading = false;
    state.error = { error: 'error' };
    expect(reducer(state, {
      type: types.DELETE_QUESTION_ERROR,
      payload: {
        error: 'error',
      }
    })).toEqual(state);
  });
});

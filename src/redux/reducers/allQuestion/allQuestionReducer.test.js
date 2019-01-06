import allQuestionReducer from './allQuestionReducer';
import * as types from '../../actionTypes/allQuestions';

const state = {
  loading: false,
  articles: null,
  error: null,
};

describe('allQuestion Reducer', () => {
  it('should return the initial state', () => {
    expect(allQuestionReducer(undefined, {})).toEqual(state);
  });

  it('should handle LOAD_ALL_QUESTION_BEGIN', () => {
    state.loading = true;

    expect(allQuestionReducer(state, {
      type: types.LOAD_ALL_QUESTION_BEGIN,
    })).toEqual(state);
  });

  it('should handle LOAD_ALL_QUESTION_SUCCESS', () => {
    state.loading = false;
    state.success = true;
    state.error = null;
    state.articles = { articles: 'some article' };

    expect(allQuestionReducer(state, {
      type: types.LOAD_ALL_QUESTION_SUCCESS,
      payload: {
        articles: 'some article'
      }
    })).toEqual(state);
  });

  it('should handle LOAD_ALL_QUESTION_ERROR', () => {
    state.loading = false;
    state.error = 'error';

    expect(allQuestionReducer(state, {
      type: types.LOAD_ALL_QUESTION_ERROR,
      payload: 'error'
    })).toEqual(state);
  });
});

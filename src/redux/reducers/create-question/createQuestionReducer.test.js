import createQuestionReducer from './createQuestionReducer';
import * as types from '../../actionTypes/createQuestion';

const state = {
  error: null,
  article: null,
  loading: false,
};

describe('login reducer test', () => {
  it('should return the initial state', () => {
    expect(createQuestionReducer(undefined, {})).toEqual(state);
  });

  it('should handle CREATE_QUESTION_BEGIN', () => {
    state.loading = true;

    expect(createQuestionReducer(state, {
      type: types.CREATE_QUESTION_BEGIN,
    })).toEqual(state);
  });

  it('should handle CREATE_QUESTION_SUCCESS', () => {
    state.loading = false;
    state.success = true;
    state.error = null;
    state.article = { article: 'some article' };

    expect(createQuestionReducer(state, {
      type: types.CREATE_QUESTION_SUCCESS,
      payload: {
        article: 'some article'
      }
    })).toEqual(state);
  });

  it('should handle CREATE_QUESTION_ERROR', () => {
    state.loading = false;
    state.error = 'error';

    expect(createQuestionReducer(state, {
      type: types.CREATE_QUESTION_ERROR,
      payload: 'error'
    })).toEqual(state);
  });
});

import answerReducer from './answerReducer';
import * as types from '../../actionTypes/answer';

const state = {
  loading: false,
  error: null,
  answer: null,
  answers: [],
  editedAnswer: null,
};

describe('answerReducer tests', () => {
  it('should return the initial state', () => {
    expect(answerReducer(undefined, {})).toEqual(state);
  });

  it('should handle ANSWER_BEGIN', () => {
    state.loading = true;

    expect(answerReducer(state, {
      type: types.ANSWER_BEGIN,
    })).toEqual(state);
  });

  it('should handle ANSWER_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.answer = { answer: 'here is an answer' };
    expect(answerReducer(state, {
      type: types.ANSWER_SUCCESS,
      payload: {
        answer: 'here is an answer',
      }
    })).toEqual(state);
  });

  it('should handle ANSWER_ERROR', () => {
    state.loading = false;
    state.error = { error: 'error' };
    expect(answerReducer(state, {
      type: types.ANSWER_ERROR,
      payload: {
        error: 'error',
      }
    })).toEqual(state);
  });

  it('should trigger GET_ANSWER_BEGIN', () => {
    state.loading = true;
    state.error = null;
    state.answer = null;

    expect(answerReducer(state, {
      type: types.GET_ANSWERS_BEGIN,
    })).toEqual(state);
  });

  it('should trigger GET_ANSWERS_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.answers = { answers: ['here is an answer'] };

    expect(answerReducer(state, {
      type: types.GET_ANSWERS_SUCCESS,
      payload: {
        answers: ['here is an answer'],
      }
    })).toEqual(state);
  });

  it('should trigger GET_ANSWERS_ERROR', () => {
    state.loading = false;
    state.error = { error: 'error' };
    state.answers = null;
    state.answer = null;
    state.editedAnswer = null;
    expect(answerReducer(state, {
      type: types.GET_ANSWERS_ERROR,
      payload: {
        error: 'error',
      },

    })).toEqual(state);
  });

  it('should trigger UPDATE_ANSWER_BEGIN', () => {
    state.loading = true;
    state.error = null;
    state.editedAnswer = null;

    expect(answerReducer(state, {
      type: types.UPDATE_ANSWER_BEGIN,
    })).toEqual(state);
  });

  it('should trigger UPDATE_ANSWER_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.editedAnswer = { answer: 'here is an answer' };

    expect(answerReducer(state, {
      type: types.UPDATE_ANSWER_SUCCESS,
      payload: {
        answer: 'here is an answer',
      }
    })).toEqual(state);
  });

  it('should trigger UPDATE_ANSWER_ERROR', () => {
    state.loading = false;
    state.error = { error: 'error' };
    state.editedAnswer = null;
    expect(answerReducer(state, {
      type: types.UPDATE_ANSWER_ERROR,
      payload: {
        error: 'error',
      },

    })).toEqual(state);
  });
});

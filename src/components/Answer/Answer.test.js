import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import AnswerComponent, { ConnectAnswerComponent } from './Answer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<AnswerComponent />', () => {
  let store;
  const initialState = {
    createQuestionReducer: {
      loading: false,
    },
    postAnswerReducer: {
      loading: false,
      answer: 'some answer',
      answers: {
        single: {
          answer: [{
            username: 'oluseyi',
            answer_number: 1,
            answer: 'some answer',
            created_at: Date.now(),
          }],
        },
      },
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('it should handle input change', () => {
    const props = {
      answers: [{
        username: 'oluseyi',
        answer_number: 1,
        answer: 'some answer',
        created_at: Date.now(),
      }]

    };

    const mockPostUserAnswerFn = jest.fn();
    const mockGetAnswerForSpecificQuestionFn = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <ConnectAnswerComponent
          postUserAnswer={mockPostUserAnswerFn}
          getAnswerForSpecificQuestion={mockGetAnswerForSpecificQuestionFn}
          {...props}
        />
      </MemoryRouter>
    );

    const answer = wrapper.find('textarea');
    answer.instance().value = 'some text added';
    answer.simulate('change');

    expect(wrapper.find('ConnectAnswerComponent').state()).toMatchObject({

    });
    wrapper.unmount();
  });

  it('handle submit as expected when postUserAnswer is called', async () => {
    const props = {
      answers: [{
        username: 'oluseyi',
        answer_number: 1,
        answer: 'some answer',
        created_at: Date.now(),
      }],
      updateAnswers: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <AnswerComponent {...props} />
        </Provider>
      </MemoryRouter>
    );

    const instance = wrapper.find('ConnectAnswerComponent').instance();
    const event = { preventDefault: jest.fn() };
    const mock = new MockAdapter(axios);

    mock.onPost().reply(201, {
      success: true,
      message: 'this works',
      question: {
        question_id: 1,
      }
    });
    await instance.handleSubmit(event);
    expect(event.preventDefault).toBeCalledTimes(1);
  });
});

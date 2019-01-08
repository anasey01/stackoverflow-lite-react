import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import SingleQuestion, { ConnectedSingleQuestion } from './SingleQuestion';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<SingleQuestion />', () => {
  let store;
  const props = {
    match: {
      params: {
        id: '1',
      }
    },
    loadSingleQuestion: jest.fn(() => ({
      single: { question: {} },
    })),
  };
  const initialState = {
    singleQuestionReducer: {
      loading: false,
    },
    postAnswerReducer: {
      loading: false,
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('calls connected single question component', () => {
    const wrapper = mount(
      <MemoryRouter >
        <Provider store={store}>
          <ConnectedSingleQuestion {...props} />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('ConnectedSingleQuestion').exists()).toBe(true);
    wrapper.unmount();
  });

  it('handleSubmit works as expected when singlequestion is called', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SingleQuestion {...props} />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedSingleQuestion').instance();
    instance.getSingleQuestion(1);
    expect(instance.getSingleQuestion).toBeDefined();
    wrapper.unmount();
  });

  it('should handleDelete question as expected', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SingleQuestion {...props} />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedSingleQuestion').instance();
    const event = { preventDefault: jest.fn() };
    const mock = new MockAdapter(axios);

    mock.onDelete().reply(201, {
      success: true,
      message: 'this works',
      response: {
        message: 'success',
      }
    });
    await instance.handleDelete(event);
    expect(event.preventDefault).toBeCalledTimes(1);
    wrapper.unmount();
  });

  it('should call cancelDelete method', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SingleQuestion {...props} />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedSingleQuestion').instance();
    const event = { preventDefault: jest.fn() };
    await instance.cancleDelete(event);
    expect(event.preventDefault).toBeCalledTimes(1);
    wrapper.unmount();
  });

  it('should display the modal', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SingleQuestion {...props} />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedSingleQuestion').instance();
    const event = { preventDefault: jest.fn() };
    await instance.displayModal(event);
    expect(event.preventDefault).toBeCalledTimes(1);
    wrapper.unmount();
  });

  it('should update answer', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SingleQuestion {...props} />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedSingleQuestion').instance();
    const answers = [{
      username: 'oluseyi',
      answer_number: 1,
      answer: 'some answer',
      created_at: Date.now(),
    }];
    await instance.updateAnswers(answers);
    expect(instance.updateAnswers).toBeDefined();
    wrapper.unmount();
  });
});

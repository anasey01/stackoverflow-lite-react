import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import CreateQuestion, { ConnectedCreateQuestion } from './CreateQuestion';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CreateQuestion />', () => {
  let store;
  const initialState = {
    createQuestionReducer: {
      loading: false,
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('should simulate state change', () => {
    const mockCreateQuestionFn = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <ConnectedCreateQuestion
          createUserQuestion={mockCreateQuestionFn} />
      </MemoryRouter>
    );

    const title = wrapper.find('#title');
    title.instance().value = 'Some title';
    title.simulate('change');

    const content = wrapper.find('#content');
    content.instance().value = 'Some content';
    content.simulate('change');

    expect(wrapper.find('ConnectedCreateQuestion').state()).toMatchObject({
      questionTitle: 'Some title',
      questionContent: 'Some content',
      questionId: null,
    });
    wrapper.unmount();
  });

  it('should simulate submiting form successfully', () => {
    const mockCreateQuestionFn = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <ConnectedCreateQuestion
          createUserQuestion={mockCreateQuestionFn} />
      </MemoryRouter>
    );

    const title = wrapper.find('#title');
    title.instance().value = 'Some title';
    title.simulate('change');

    const content = wrapper.find('#content');
    content.instance().value = 'Some content';
    content.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(mockCreateQuestionFn.mock.calls[0][0]).toEqual({
      questionTitle: 'Some title',
      questionContent: 'Some content',
      questionId: null,
    });
    wrapper.unmount();
  });

  it('handleSubmit works as expected when createUserQuestion returns true', async () => {
    const mock = new MockAdapter(axios);
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <CreateQuestion />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedCreateQuestion').instance();

    const event = { preventDefault: jest.fn() };

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

  it('handleSubmit works as expected when createUserQuestion returns false', async () => {
    const mock = new MockAdapter(axios);
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <CreateQuestion />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedCreateQuestion').instance();

    const event = { preventDefault: jest.fn() };

    mock.onPost().reply(201, {
      success: false,
      message: 'this doesn\'t works',
    });

    await instance.handleSubmit(event);
    expect(event.preventDefault).toBeCalledTimes(1);
  });
});

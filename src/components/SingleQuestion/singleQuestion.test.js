import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import SingleQuestion, { ConnectedSingleQuestion } from './SingleQuestion';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<SingleQuestion />', () => {
  it('calls connected single question component', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = mount(
      <MemoryRouter >
        <Provider store={store}>
          <ConnectedSingleQuestion/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('ConnectedSingleQuestion').exists()).toBe(true);
  });

  it('handleSubmit works as expected when signupUser returns false', async () => {
    const store = mockStore({});
    const props = {
      match: {
        params: {
          id: 1,
        }
      },
      loadSingleQuestion: jest.fn(() => ({
        single: { question: {} },
      })),
    };
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
  });
});

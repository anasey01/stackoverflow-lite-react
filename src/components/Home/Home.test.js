import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<HomeComponent />', () => {
  let store;
  const initialState = {
    allQuestionReducer: {
      loading: false,
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('render the Home component', () => {
    const mockGetAllUsersQuestion = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Home getAllUsersQuestion={mockGetAllUsersQuestion}/>
        </Provider>
      </MemoryRouter>
    );

    // expect(wrapper.find('.question-summary').exists()).toBe(true);
  });
});

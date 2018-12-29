import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Signup, { ConnectedSignup } from './Signup';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Signup />', () => {
  it('matches the snapshoot', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = shallow(<Provider store={store}>
      <Signup/>
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});

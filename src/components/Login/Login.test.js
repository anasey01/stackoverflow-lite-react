import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import Login, { ConnectedLogin } from './Login';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Login />', () => {
  it('should render ConnectedLogin', () => {
    const mockLoginFn = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <ConnectedLogin login={mockLoginFn} />
      </MemoryRouter>
    );
    expect(wrapper.find('#login-form').exists()).toBe(true);
    expect(wrapper.find('#username').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
    wrapper.unmount();
  });

  it('should simulate state change', () => {
    const mockLoginFn = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <ConnectedLogin login={mockLoginFn} />
      </MemoryRouter>
    );

    const username = wrapper.find('#username');
    username.instance().value = 'john Doe';
    username.simulate('change');

    const password = wrapper.find('#password');
    password.instance().value = 'password';
    password.simulate('change');
    // console.log(wrapper.state());
    expect(wrapper.find('ConnectedLogin').state()).toEqual({
      username: 'john Doe',
      password: 'password',
    });
    wrapper.unmount();
  });

  it('should simulate submiting form successfully', () => {
    const mockLoginFn = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <ConnectedLogin login={mockLoginFn} />
      </MemoryRouter>
    );
    const username = wrapper.find('#username');
    username.instance().value = 'john Doe';
    username.simulate('change');

    const password = wrapper.find('#password');
    password.instance().value = 'password';
    password.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(mockLoginFn.mock.calls[0][0]).toEqual({
      username: 'john Doe',
      password: 'password',
    });
    wrapper.unmount();
  });

  it('handleSubmit works as expected when loginRequest returns true', () => {
    const mock = new MockAdapter(axios);
    const store = mockStore({});
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedLogin').instance();

    const event = { preventDefault: jest.fn() };

    mock.onPost().reply(201, {
      success: true,
      message: 'this works',
    });

    instance.handleSubmit(event);
    expect(event.preventDefault).toBeCalledTimes(1);
    wrapper.unmount();
  });

  it('handleSubmit works as expected when loginRequest returns false', () => {
    const mock = new MockAdapter(axios);
    const store = mockStore({});
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const instance = wrapper.find('ConnectedLogin').instance();

    const event = { preventDefault: jest.fn() };

    mock.onPost().reply(201, {
      success: false,
      message: 'this doesn\'t work',
    });

    instance.handleSubmit(event);
    expect(event.preventDefault).toBeCalledTimes(1);
    wrapper.unmount();
  });
});

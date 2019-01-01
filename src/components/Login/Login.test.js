import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConnectedLogin } from './Login';

describe('<Login />', () => {
  it('should shallow render ConnectedLogin', () => {
    const mockLoginFn = jest.fn();
    const wrapper = shallow(<ConnectedLogin login={mockLoginFn} />);
    expect(wrapper.find('#login-form').exists()).toBe(true);
    expect(wrapper.find('#username').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
  });

  it('should simulate state change', () => {
    const mockLoginFn = jest.fn();
    const wrapper = mount(<ConnectedLogin login={mockLoginFn} />);

    const username = wrapper.find('#username');
    username.instance().value = 'john Doe';
    username.simulate('change');

    const password = wrapper.find('#password');
    password.instance().value = 'password';
    password.simulate('change');

    expect(wrapper.state()).toMatchObject({
      username: 'john Doe',
      password: 'password',
    });
    wrapper.unmount();
  });

  it('should simulate submiting form successfully', () => {
    const mockLoginFn = jest.fn();
    const wrapper = mount(<ConnectedLogin login={mockLoginFn} />);
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
});

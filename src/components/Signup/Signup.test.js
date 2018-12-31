import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Signup, { SignupComponent } from './Signup';

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

  it('it should update the state when data is passed', () => {
    const mockSignupFn = jest.fn();

    const wrapper = mount(<SignupComponent signupUser={mockSignupFn} />);
    const fullnameInput = wrapper.find('#fullname');
    fullnameInput.instance().value = 'john Doe';
    fullnameInput.simulate('change');

    const genderinput = wrapper.find('#gender');
    genderinput.instance().value = 'M';
    genderinput.simulate('change');

    const usernameInput = wrapper.find('#username');
    usernameInput.instance().value = 'johnny';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('#password');
    passwordInput.instance().value = 'password12';
    passwordInput.simulate('change');

    const emailInput = wrapper.find('#email');
    emailInput.instance().value = 'johndoe@email.com';
    emailInput.simulate('change');

    expect(wrapper.state()).toMatchObject({
      fullname: 'john Doe',
      gender: 'M',
      username: 'johnny',
      password: 'password12',
      email: 'johndoe@email.com'
    });
    wrapper.unmount();
  });

  it('should handle submit changes successfully', () => {
    const mockSignupFn = jest.fn();

    const wrapper = mount(<SignupComponent signupUser={mockSignupFn}/>);

    const fullnameInput = wrapper.find('#fullname');
    fullnameInput.instance().value = 'john Doe';
    fullnameInput.simulate('change');

    const genderinput = wrapper.find('#gender');
    genderinput.instance().value = 'M';
    genderinput.simulate('change');

    const usernameInput = wrapper.find('#username');
    usernameInput.instance().value = 'johnny';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('#password');
    passwordInput.instance().value = 'password12';
    passwordInput.simulate('change');

    const emailInput = wrapper.find('#email');
    emailInput.instance().value = 'johndoe@email.com';
    emailInput.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    wrapper.unmount();

    expect(mockSignupFn.mock.calls[0][0]).toEqual({
      fullname: 'john Doe',
      gender: 'M',
      username: 'johnny',
      password: 'password12',
      email: 'johndoe@email.com'
    });
  });
});

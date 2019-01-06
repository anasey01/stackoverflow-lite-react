import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Logout, { ConnectedLogout, mapDispatchToProps } from './Logout';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Logout shallow rendering tests', () => {
  const props = {
    store: mockStore({ isLoggedOut: false }),
    userLogout: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };

  const wrapper = shallow(
    <ConnectedLogout
      {...props}
    />
  );

  it('should map userLogout() to props', () => {
    expect(mapDispatchToProps(props.logout)).toBeTruthy();
  });

  it('should call userLogout() on mount', () => {
    wrapper.instance().componentDidMount();
    expect(props.userLogout.mock.calls.length).toBe(1);
  });

  it('should call history.push() on mount', () => {
    wrapper.instance().componentDidMount();
    expect(props.history.push.mock.calls.length).toBe(1);
  });

  it('should dispatch logoutRequest()', () => {
    const logoutWrapper = mount(
      <Logout {...props}/>
    );
    expect(logoutWrapper.exists()).toBe(true);
  });
});

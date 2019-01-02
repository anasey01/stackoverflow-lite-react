import React from 'react';
import { shallow } from 'enzyme';
import RouteComponent from './RouteComponent';

describe('Routes.js shallow tests', () => {
  const mockedDispatch = jest.fn();
  const wrapper = shallow(<RouteComponent dispatch={mockedDispatch} />);

  it('should render the app correctly', () => {
    expect(wrapper.find('Router').exists()).toBe(true);
  });
});

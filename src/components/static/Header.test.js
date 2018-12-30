import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';


describe('Header mount rendering tests', () => {
  it('should render Header component', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('nav').exists()).toBe(true);
    wrapper.unmount();
  });
});

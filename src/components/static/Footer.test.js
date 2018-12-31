import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';


describe('Header mount rendering tests', () => {
  it('should render Footer component', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('footer').exists()).toBe(true);
    wrapper.unmount();
  });
});

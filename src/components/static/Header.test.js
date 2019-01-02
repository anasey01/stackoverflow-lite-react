import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';


describe('Header mount rendering tests', () => {
  it('should render Header component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(wrapper.find('nav').exists()).toBe(true);
    wrapper.unmount();
  });
});

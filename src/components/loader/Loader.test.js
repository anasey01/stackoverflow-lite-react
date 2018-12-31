import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loader';


describe('test loading', () => {
  it('should render the loader', () => {
    const header = shallow(<Loading />);
    expect(header.find('.spinner').text()).toEqual('<Loader />');
  });
});

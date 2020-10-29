import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from './AboutUs';

describe('<AboutUs />', () => {
  it('should render without errors', () => {
    const component = shallow(<AboutUs />);
    const wrapper = component.find('.AboutUs');
    expect(wrapper.length).toBe(1);
  });
});

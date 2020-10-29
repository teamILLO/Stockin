import React from 'react';
import { shallow } from 'enzyme';
import CircularPercentage from './CircularPercentage';

describe('<CircularPercentage />', () => {
  it('should render without errors', () => {
    const component = shallow(<CircularPercentage />);
    const wrapper = component.find('.CircularPercentage');
    expect(wrapper.length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import HalfCircularScore from './HalfCircularScore';

describe('<HalfCircularScore />', () => {
  it('should render without errors', () => {
    const component = shallow(<HalfCircularScore />);
    const wrapper = component.find('.HalfCircularScore');
    expect(wrapper.length).toBe(1);
  });
});

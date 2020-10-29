import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';

describe('<Preview />', () => {
  it('should render without errors', () => {
    const component = shallow(<Preview />);
    const wrapper = component.find('.Preview');
    expect(wrapper.length).toBe(1);
  });
});

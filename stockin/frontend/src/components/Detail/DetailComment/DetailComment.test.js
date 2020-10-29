import React from 'react';
import { shallow } from 'enzyme';
import DetailComment from './DetailComment';

describe('<DetailComment />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailComment />);
    const wrapper = component.find('.DetailComment');
    expect(wrapper.length).toBe(1);
  });
});

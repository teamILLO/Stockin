import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('<Logo />', () => {
  it('should render without errors', () => {
    const component = shallow(<Logo />);
    const wrapper = component.find('.Logo');
    expect(wrapper.length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import DetailNews from './DetailNews';

describe('<DetailNews />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailNews />);
    const wrapper = component.find('.DetailNews');
    expect(wrapper.length).toBe(1);
  });
});

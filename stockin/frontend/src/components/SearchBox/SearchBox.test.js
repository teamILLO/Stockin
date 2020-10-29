import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  it('should render without errors', () => {
    const component = shallow(<SearchBox />);
    const wrapper = component.find('.SearchBox');
    expect(wrapper.length).toBe(1);
  });
});

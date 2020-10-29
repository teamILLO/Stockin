import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('<Footer />', () => {
  it('should render without errors', () => {
    const component = shallow(<Footer />);
    const wrapper = component.find('.Footer');
    expect(wrapper.length).toBe(1);
  });
});

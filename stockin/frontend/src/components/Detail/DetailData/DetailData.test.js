import React from 'react';
import { shallow } from 'enzyme';
import DetailData from './DetailData';

describe('<DetailData />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailData />);
    const wrapper = component.find('.DetailData');
    expect(wrapper.length).toBe(1);
  });

  it('should call onClickInterest', () => {
    const component = shallow(<DetailData />);
    const wrapper = component.find('.detailInterest');
    wrapper.simulate('click');
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import DetailPriceTrends from './DetailPriceTrends';

describe('<DetailPriceTrends />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailPriceTrends />);
    const wrapper = component.find('.DetailPriceTrends');
    expect(wrapper.length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import DetailFinancialState from './DetailFinancialState';

describe('<DetailFinancialState />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailFinancialState />);
    const wrapper = component.find('.DetailFinancialState');
    expect(wrapper.length).toBe(1);
  });
});

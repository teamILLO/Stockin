import React from 'react';
import { shallow } from 'enzyme';
import StockBlock from './StockBlock';

describe('<StockBlock />', () => {
  it('should render without errors', () => {
    const component = shallow(<StockBlock />);
    const wrapper = component.find('.StockBlock');
    expect(wrapper.length).toBe(1);
  });
});

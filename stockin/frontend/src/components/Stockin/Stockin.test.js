import React from 'react';
import { shallow } from 'enzyme';
import Stockin from './Stockin';

describe('<Stockin />', () => {
  it('should render without errors', () => {
    const component = shallow(<Stockin />);
    const wrapper = component.find('.Stockin');
    expect(wrapper.length).toBe(1);
  });
});

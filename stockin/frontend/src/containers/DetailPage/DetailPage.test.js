import React from 'react';
import { shallow } from 'enzyme';
import DetailPage from './DetailPage';

describe('<DetailPage />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailPage />);
    const wrapper = component.find('.DetailPage');
    expect(wrapper.length).toBe(1);
  });
});

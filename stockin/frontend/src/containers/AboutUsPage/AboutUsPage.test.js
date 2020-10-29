import React from 'react';
import { shallow } from 'enzyme';
import AboutUsPage from './AboutUsPage';

describe('<AboutUsPage />', () => {
  it('should render without errors', () => {
    const component = shallow(<AboutUsPage />);
    const wrapper = component.find('.AboutUsPage');
    expect(wrapper.length).toBe(1);
  });
});

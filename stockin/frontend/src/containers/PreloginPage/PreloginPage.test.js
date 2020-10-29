import React from 'react';
import { shallow } from 'enzyme';
import PreloginPage from './PreloginPage';

describe('<PreloginPage />', () => {
  it('should render without errors', () => {
    const component = shallow(<PreloginPage />);
    const wrapper = component.find('.PreloginPage');
    expect(wrapper.length).toBe(1);
  });

  it('should change email and password properly', () => {
    const component = shallow(<PreloginPage />);
    const wrapper = component.find('#email');
  });
});

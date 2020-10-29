import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';

describe('<MainPage />', () => {
  it('should render without errors', () => {
    const component = shallow(<MainPage />);
    const wrapper = component.find('.MainPage');
    expect(wrapper.length).toBe(1);
  });
});

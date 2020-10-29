import React from 'react';
import { shallow } from 'enzyme';
import ReportPage from './ReportPage';

describe('<ReportPage />', () => {
  it('should render without errors', () => {
    const component = shallow(<ReportPage />);
    const wrapper = component.find('.ReportPage');
    expect(wrapper.length).toBe(1);
  });
});

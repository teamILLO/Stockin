import React from 'react';
import { shallow } from 'enzyme';
import DetailOverview from './DetailOverview';

describe('<DetailOverview />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailOverview />);
    const wrapper = component.find('.DetailOverview');
    expect(wrapper.length).toBe(1);
  });
});

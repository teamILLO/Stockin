import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MyInterestsChart from './MyInterestsChart';

describe('<MyInterestsChar />', () => {
  it('should render without errors', () => {
    const { container } = render(<MyInterestsChart />);
    const query = queryAllByTestId(container, 'MyInterestsChart');
    expect(query.length).toBe(1);
  });
});

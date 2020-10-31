import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import CircularPercentage from './CircularPercentage';

describe('<CircularPercentage />', () => {
  it('should render without errors', () => {
    const { container } = render(<CircularPercentage />);
    const query = queryAllByTestId(container, 'CircularPercentage');
    expect(query.length).toBe(1);
  });
});

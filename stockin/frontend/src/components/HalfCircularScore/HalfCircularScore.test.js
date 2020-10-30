import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import HalfCircularScore from './HalfCircularScore';

describe('<HalfCircularScore />', () => {
  it('should render without errors', () => {
    const { container } = render(<HalfCircularScore />);
    const query = queryAllByTestId(container, 'HalfCircularScore');
    expect(query.length).toBe(1);
  });
});

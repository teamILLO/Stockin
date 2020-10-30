import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import DetailPriceTrends from './DetailPriceTrends';

describe('<DetailPriceTrends />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailPriceTrends />);
    const query = queryAllByTestId(container, 'DetailPriceTrends');
    expect(query.length).toBe(1);
  });
});

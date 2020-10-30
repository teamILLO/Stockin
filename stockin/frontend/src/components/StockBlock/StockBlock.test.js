import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import StockBlock from './StockBlock';

describe('<StockBlock />', () => {
  it('should render without errors', () => {
    const { container } = render(<StockBlock />);
    const query = queryAllByTestId(container, 'StockBlock');
    expect(query.length).toBe(1);
  });
});

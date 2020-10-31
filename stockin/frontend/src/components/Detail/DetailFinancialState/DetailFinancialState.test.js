import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import DetailFinancialState from './DetailFinancialState';

describe('<DetailFinancialState />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailFinancialState />);
    const query = queryAllByTestId(container, 'DetailFinancialState');
    expect(query.length).toBe(1);
  });
});

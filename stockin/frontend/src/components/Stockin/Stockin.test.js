import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import Stockin from './Stockin';

describe('<Stockin />', () => {
  it('should render without errors', () => {
    const { container } = render(<Stockin />);
    const query = queryAllByTestId(container, 'Stockin');
    expect(query.length).toBe(1);
  });
});

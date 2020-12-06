import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import Preview from './Preview';

describe('<Preview />', () => {
  it('should render without errors', () => {
    const { container } = render(<Preview />);
    const query = queryAllByTestId(container, 'Preview');
    expect(query.length).toBe(1);
  });
});

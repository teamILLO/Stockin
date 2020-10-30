import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import DetailComment from './DetailComment';

describe('<DetailComment />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailComment />);
    const query = queryAllByTestId(container, 'DetailComment');
    expect(query.length).toBe(1);
  });
});

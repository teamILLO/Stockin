import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import DetailPage from './DetailPage';

describe('<DetailPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailPage />);
    const query = queryAllByTestId(container, 'DetailPage');
    expect(query.length).toBe(1);
  });
});

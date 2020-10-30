import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import PreloginPage from './PreloginPage';

describe('<PreloginPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<PreloginPage />);
    const query = queryAllByTestId(container, 'PreloginPage');
    expect(query.length).toBe(1);
  });
});

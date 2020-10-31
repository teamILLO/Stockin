import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import Logo from './Logo';

describe('<Logo />', () => {
  it('should render without errors', () => {
    const { container } = render(<Logo />);
    const query = queryAllByTestId(container, 'Logo');
    expect(query.length).toBe(1);
  });
});

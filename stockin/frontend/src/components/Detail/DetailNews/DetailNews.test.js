import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import DetailNews from './DetailNews';

describe('<DetailNews />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailNews />);
    const query = queryAllByTestId(container, 'DetailNews');
    expect(query.length).toBe(1);
  });
});

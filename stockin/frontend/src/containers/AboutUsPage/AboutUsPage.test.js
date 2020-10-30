import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import AboutUsPage from './AboutUsPage';

describe('<AboutUsPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<AboutUsPage />);
    const query = queryAllByTestId(container, 'AboutUsPage');
    expect(query.length).toBe(1);
  });
});

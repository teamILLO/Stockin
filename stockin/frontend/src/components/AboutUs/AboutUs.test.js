import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import AboutUs from './AboutUs';

describe('<AboutUs />', () => {
  it('should render without errors', () => {
    const { container } = render(<AboutUs />);
    const query = queryAllByTestId(container, 'AboutUs');
    expect(query.length).toBe(1);
  });
});

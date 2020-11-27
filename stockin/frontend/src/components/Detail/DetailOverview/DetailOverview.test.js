import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import DetailOverview from './DetailOverview';

describe('<DetailOverview />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailOverview />);
    const query = queryAllByTestId(container, 'DetailOverview');
    expect(query.length).toBe(1);
  });
});

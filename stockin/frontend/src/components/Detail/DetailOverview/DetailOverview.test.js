import React from 'react';
import { render, queryAllByTestId, queryAllByText } from '@testing-library/react';
import DetailOverview from './DetailOverview';

describe('<DetailOverview />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailOverview />);
    const query = queryAllByTestId(container, 'DetailOverview');
    expect(query.length).toBe(1);
  });
  it('should render without errors', () => {
    const { container } = render(<DetailOverview stock={{ score: 2 }} />);
    const query = queryAllByTestId(container, 'DetailOverview');
    expect(query.length).toBe(1);
  });
  it('should render without errors', () => {
    const { container } = render(
      <DetailOverview stock={{ score: 2 }} fs_score={{ score: undefined }} />,
    );
    const query = queryAllByTestId(container, 'DetailOverview');
    expect(query.length).toBe(1);
  });
  it('should render without errors', () => {
    const { container } = render(
      <DetailOverview stock={{ score: 61 }} fs_score={{ score: 2.5 }} />,
    );
    const query = queryAllByTestId(container, 'DetailOverview');
    expect(query.length).toBe(1);
  });
});

import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MyInterestsDetail from './MyInterestsDetail';

describe('<MyInterestsDetail />', () => {
  it('should render without errors', () => {
    const { container } = render(<MyInterestsDetail />);
    const query = queryAllByTestId(container, 'MyInterestsDetail');
    expect(query.length).toBe(1);
  });
});

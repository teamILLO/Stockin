import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import MyPage from './MyPage';

describe('<MyPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<MyPage />);
    const query = queryAllByTestId(container, 'MyPage');
    expect(query.length).toBe(1);
  });
});

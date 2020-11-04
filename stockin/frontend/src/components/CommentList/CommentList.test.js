import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import CommentList from './CommentList';

describe('<CommentList />', () => {
  it('should render without errors', () => {
    const { container } = render(<CommentList />);
    const query = queryAllByTestId(container, 'CommentList');
    expect(query.length).toBe(1);
  });
});

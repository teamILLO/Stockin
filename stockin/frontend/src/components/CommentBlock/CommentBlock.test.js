import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import CommentBlock from './CommentBlock';

describe('<CommentBlock />', () => {
  it('should render without errors', () => {
    const { container } = render(<CommentBlock />);
    const query = queryAllByTestId(container, 'CommentBlock');
    expect(query.length).toBe(1);
  });
});

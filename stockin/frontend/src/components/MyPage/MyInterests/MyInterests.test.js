import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MyInterests from './MyInterests';

describe('<MyInterests />', () => {
  it('should render without errors', () => {
    const { container } = render(<MyInterests />);
    const query = queryAllByTestId(container, 'MyInterests');
    expect(query.length).toBe(1);
  });
});

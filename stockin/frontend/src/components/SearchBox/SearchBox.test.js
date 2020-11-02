import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  it('should render without errors', () => {
    const { container } = render(<SearchBox />);
    const query = queryAllByTestId(container, 'SearchBox');
    expect(query.length).toBe(1);
  });
});

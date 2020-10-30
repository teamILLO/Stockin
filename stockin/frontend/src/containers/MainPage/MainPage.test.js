import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import MainPage from './MainPage';

describe('<MainPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<MainPage />);
    const query = queryAllByTestId(container, 'MainPage');
    expect(query.length).toBe(1);
  });
});

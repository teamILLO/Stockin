import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import DatePicker from './NewsDatePicker';

describe('<NewsDatePicker />', () => {
  it('should render without errors', () => {
    const { container } = render(<NewsDatePicker />);
    const query = queryAllByTestId(container, 'DatePicker');
    expect(query.length).toBe(1);
  });
});

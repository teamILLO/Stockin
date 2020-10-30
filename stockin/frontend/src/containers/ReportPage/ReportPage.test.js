import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import ReportPage from './ReportPage';

describe('<ReportPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<ReportPage />);
    const query = queryAllByTestId(container, 'ReportPage');
    expect(query.length).toBe(1);
  });
});

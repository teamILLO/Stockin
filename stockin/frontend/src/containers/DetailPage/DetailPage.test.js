import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import DetailPage from './DetailPage';

describe('<DetailPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailPage />);
    const query = queryAllByTestId(container, 'DetailPage');
    expect(query.length).toBe(1);
  });

  test('change tab when clicked News', () => {
    const { container } = render(<DetailPage />);
    fireEvent.click(screen.getByText(/news/i));
    const query = queryAllByTestId(container, 'DetailNews');
    expect(query.length).toBe(1);
  });
  test('change tab when clicked Price Trends', () => {
    const { container } = render(<DetailPage />);
    fireEvent.click(screen.getByText(/price trends/i));
    const query = queryAllByTestId(container, 'DetailPriceTrends');
    expect(query.length).toBe(1);
  });
  test('change tab when clicked FiancialState', () => {
    const { container } = render(<DetailPage />);
    fireEvent.click(screen.getByText(/financial state/i));
    const query = queryAllByTestId(container, 'DetailFinancialState');
    expect(query.length).toBe(1);
  });
  test('change tab when clicked Comments', () => {
    const { container } = render(<DetailPage />);
    fireEvent.click(screen.getByText(/comments/i));
    const query = queryAllByTestId(container, 'DetailComment');
    expect(query.length).toBe(1);
  });
});

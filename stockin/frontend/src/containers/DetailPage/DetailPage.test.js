import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { history } from '../../store/store';
import DetailPage from './DetailPage';

describe('<DetailPage />', () => {
  let detailPage;
  beforeEach(() => {
    detailPage = (
      <Provider store={store}>
        <DetailPage history={history} />
      </Provider>
    );
  });

  it('should render without errors', () => {
    const { container } = render(detailPage);
    const query = queryAllByTestId(container, 'DetailPage');
    expect(query.length).toBe(1);
  });

  test('should change tab when clicked News', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/news/i));
    const query = queryAllByTestId(container, 'DetailNews');
    expect(query.length).toBe(1);
  });
  test('should change tab when clicked Price Trends', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/price trends/i));
    const query = queryAllByTestId(container, 'DetailPriceTrends');
    expect(query.length).toBe(1);
  });
  test('should change tab when clicked FiancialState', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/financial state/i));
    const query = queryAllByTestId(container, 'DetailFinancialState');
    expect(query.length).toBe(1);
  });
  test('should change tab when clicked Comments', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/comments/i));
    const query = queryAllByTestId(container, 'DetailComment');
    expect(query.length).toBe(1);
  });
});

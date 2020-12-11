import React from 'react';
import { render, fireEvent, getByTestId, queryAllByTestId } from '@testing-library/react';
import UpTab from './UpTab';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as stock from '../../store/stock/stock';
import * as util from './index';

util.renderReportBlock = jest.fn((li, tab) => [
  <div data-testid="spyBlock" key={1}></div>,
  <div data-testid="spyBlock" key={2}></div>,
]);
const mockStore = getMockStore({ loggingIn: true, user: { id: 1 } });

describe('<UpTab />', () => {
  let spyGetDownStockInfo, spyGetDownNews, spyGetDownStockHistory;
  let upTab;

  beforeEach(() => {
    upTab = (
      <Provider store={mockStore}>
        <UpTab history={history} />
      </Provider>
    );
    spyGetDownStockInfo = jest.spyOn(stock, 'getDownStockInfo').mockImplementation(() => {
      return (dispatch) => {};
    });

    spyGetDownNews = jest.spyOn(stock, 'getDownNews').mockImplementation(() => {
      return (dispatch) => {};
    });

    spyGetDownStockHistory = jest.spyOn(stock, 'getDownStockHistory').mockImplementation(() => {
      return (dispatch) => {};
    });
  });

  it('should render without errors', () => {
    const { container } = render(upTab);
    const query = queryAllByTestId(container, 'UpTab');
    expect(query.length).toBe(1);
    fireEvent.click(getByTestId(container, 'menuItem1'));
  });
});

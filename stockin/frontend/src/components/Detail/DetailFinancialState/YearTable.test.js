import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getMockStore } from '../../../test-utils/mocks';
import YearTable from './YearTable';
import * as fsStore from '../../../store/financialstats/financialstats';


const fsList = [
  {
    id: 1,
    quarter: '20년 12월',
    sales: 10,
    operatingProfit: 1,
    netIncome: 1,
    operatingMargin: 1,
    netProfitMargin: 1,
    PER: 1,
    PBR: 1,
    ROE: 1,
  },
  {
    id: 2,
    quarter: '19년 12월',
    sales: 20,
    operatingProfit: 2,
    netIncome: 2,
    operatingMargin: 2,
    netProfitMargin: 2,
    PER: 2,
    PBR: 2,
    ROE: 2,
  },
  {
    id: 3,
    quarter: '18년 9월',
    sales: 30,
    operatingProfit: 3,
    netIncome: 3,
    operatingMargin: 3,
    netProfitMargin: 3,
    PER: 3,
    PBR: 3,
    ROE: 3,
  },
];

const mockStore = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: fsList },
);

describe('<YearTable />', () => {
  let yearTable, spyGetFs;

  beforeEach(() => {
    yearTable = (
      <Provider store={mockStore}>
        <YearTable />
      </Provider>
    );

    spyGetFs = jest.spyOn(fsStore, 'getFs').mockImplementation((id, data) => {
      return (dispatch) => {};
    });
  });
  it('should handle with invalid url', () => {
    const { container } = render(yearTable);
    const query = queryAllByTestId(container, 'YearTable');
    expect(query.length).toBe(1);
    // expect(spyGetFs).toHaveBeenCalledTimes(1);
  });

  it('should render without errors', () => {
    window.history.pushState({}, '', '/localhost:3000/detail/1/');
    const { container } = render(yearTable);
    const query = queryAllByTestId(container, 'YearTable');
    expect(query.length).toBe(1);
  });
});

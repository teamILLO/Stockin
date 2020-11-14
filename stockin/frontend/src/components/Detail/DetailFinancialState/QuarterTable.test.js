import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getMockStore } from '../../../test-utils/mocks';
import QuarterTable from './QuarterTable';
import * as fsStore from '../../../store/financialstats/financialstats';

// jest.mock('./NewsDatePicker', () => {
//   return jest.fn((props) => {
//     return <div data-testid="spyNewsDatePicker"></div>;
//   });
// });

const fsList = [
  {
    id: 1,
    quarter: 1,
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
    quarter: 2,
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
    quarter: 3,
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

describe('<QuarterTable />', () => {
  let quarterTable, spyGetFs;

  beforeEach(() => {
    quarterTable = (
      <Provider store={mockStore}>
        <QuarterTable />
      </Provider>
    );

    spyGetFs = jest.spyOn(fsStore, 'getFs').mockImplementation((id, data) => {
      return (dispatch) => {};
    });
  });
  it('should render without errors', () => {
    const { container } = render(quarterTable);
    const query = queryAllByTestId(container, 'QuarterTable');
    expect(query.length).toBe(1);
    // expect(spyGetFs).toHaveBeenCalledTimes(1);
  });
});

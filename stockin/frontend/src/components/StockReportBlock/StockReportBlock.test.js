import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import StockReportBlock from './StockReportBlock';
import store, { history } from '../../store/store';


const mockProps = {
  isUp : true,
  id : 1,
  rank : '1',
  title : 'test_title',
  isKOSPI : true,
  code : '1',
  price : '2',
  yesterdayPrice : '1',
  score : '1',
  news : [
    { id : '1', link : 'test_link', title : 'test_title', press : 'test_press', date : '2020-12-01'},
    { id : '2', link : 'test_link', title : 'test_title', press : 'test_press', date : '2020-12-01'},
  ],
  stockhistory : [
    { id : '1', endPrice : '1', tradeVolume : '1', date : '2020-12-01'},
    { id : '2', endPrice : '1', tradeVolume : '1', date : '2020-12-02'},
  ],
}

const mockProps_excluded = {
  isUp : false,
  id : 1,
  rank : null,
  title : null,
  isKOSPI : false,
  code : null,
  price : null,
  yesterdayPrice : null,
  score : null,
  news : [],
  stockhistory : [],
}


describe('<StockReportBlock />', () => {
  let stockReportBlock;
  let spyHistoryPush;

  beforeEach(() => {
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors when StockReportBlock', () => {
    stockReportBlock = 
      <Provider store={store}>
        <StockReportBlock
          history={history}
          isUp={mockProps.isUp}
          id={mockProps.id}
          rank={mockProps.rank}
          title={mockProps.title}
          isKOSPI={mockProps.isKOSPI}
          code={mockProps.code}
          price={mockProps.price}
          yesterdayPrice={mockProps.yesterdayPrice}
          score={mockProps.score}
          news={mockProps.news}
          stockhistory={mockProps.stockhistory}
        />
      </Provider>
    const { container } = render(stockReportBlock);
    let query = queryAllByTestId(container, 'StockReportBlock');
    expect(query.length).toBe(1);

    // When grid row is clicked
    const input = screen.getAllByTestId('Grid_Row');
    fireEvent.click(input[0]);
  });

  it('should render without errors when StockReportBlock with excluded values', () => {
    stockReportBlock = 
      <Provider store={store}>
        <StockReportBlock
          history={history}
          isUp={mockProps_excluded.isUp}
          id={mockProps_excluded.id}
          rank={mockProps_excluded.rank}
          title={mockProps_excluded.title}
          isKOSPI={mockProps_excluded.isKOSPI}
          code={mockProps_excluded.code}
          price={mockProps_excluded.price}
          yesterdayPrice={mockProps_excluded.yesterdayPrice}
          score={mockProps_excluded.score}
          news={mockProps_excluded.news}
          stockhistory={mockProps_excluded.stockhistory}
        />
      </Provider>
    const { container } = render(stockReportBlock);
    const query = queryAllByTestId(container, 'StockReportBlock');
    expect(query.length).toBe(1);
  });


});

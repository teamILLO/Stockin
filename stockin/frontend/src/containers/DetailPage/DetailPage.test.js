import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import DetailPage from './DetailPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';
import * as stockHistory from '../../store/stockHistory/stockHistory';

jest.mock('../../components/Header/Header', () => {
  return jest.fn((props) => {
    return <div className="spyHeader"></div>;
  });
});

jest.mock('../../components/Detail/DetailData/DetailData', () => {
  return jest.fn((props) => {
    return <div className="spyDetailData"></div>;
  });
});

jest.mock('../../components/Detail/DetailOverview/DetailOverview', () => {
  return jest.fn((props) => {
    return <div data-testid="spyDetailOverview"></div>;
  });
});

jest.mock('../../components/Detail/DetailNews/DetailNews', () => {
  return jest.fn((props) => {
    return <div data-testid="spyDetailNews"></div>;
  });
});

jest.mock('../../components/Detail/DetailPriceTrends/DetailPriceTrends', () => {
  return jest.fn((props) => {
    return <div data-testid="spyDetailPriceTrends"></div>;
  });
});

jest.mock('../../components/Detail/DetailFinancialState/DetailFinancialState', () => {
  return jest.fn((props) => {
    return <div data-testid="spyDetailFinancialState"></div>;
  });
});

jest.mock('../../components/Detail/DetailComment/DetailComment', () => {
  return jest.fn((props) => {
    return <div data-testid="spyDetailComment"></div>;
  });
});

jest.mock('../../components/Footer/Footer', () => {
  return jest.fn((props) => {
    return <div className="spyFooter">a</div>;
  });
});

jest.mock('../../components/StockInfo/StockInfo', ()=>{
  return jest.fn((props) => {
    return <div className="stockInfo">a</div>;
  });
})

const mockStore = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
const mockStoreLogout = getMockStore(
  { loggingIn: false, user: null },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
const mockStoreUndefined = getMockStore(
  { loggingIn: undefined, user: null },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);

const defaultProps = {
  match: { params: { id: 123 } },
};
describe('<DetailPage />', () => {
  let detailPage,
    detailPageLogout,
    detailPageUndefined,
    spyHistoryPush,
    spyCheckLogin,
    spyGetStockHistory;
    
  beforeEach(() => {
    detailPage = (
      <Provider store={mockStore}>
        <DetailPage history={history} {...defaultProps} />
      </Provider>
    );

    detailPageLogout = (
      <Provider store={mockStoreLogout}>
        <DetailPage history={history} {...defaultProps} />
      </Provider>
    );

    detailPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <DetailPage history={history} {...defaultProps} />
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyGetStockHistory = jest.spyOn(stockHistory, 'getStockHistory').mockImplementation(() => {
      return (dispatch) => {};
    });
  });

  it('should render without errors', () => {
    const { container } = render(detailPage);
    const query = queryAllByTestId(container, 'DetailPage');
    expect(query.length).toBe(1);
  });

  it('should change tab when clicked News', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/news/i));
    const query = queryAllByTestId(container, 'spyDetailNews');
    expect(query.length).toBe(1);
  });

  it('should change tab when clicked Price Trends', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/price trends/i));
    const query = queryAllByTestId(container, 'spyDetailPriceTrends');
    expect(query.length).toBe(1);
  });

  it('should change tab when clicked FiancialState', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/financial state/i));
    const query = queryAllByTestId(container, 'spyDetailFinancialState');
    expect(query.length).toBe(1);
  });

  it('should change tab when clicked Comments', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/comments/i));
    const query = queryAllByTestId(container, 'spyDetailComment');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    render(detailPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    render(detailPageUndefined);
    expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  });
});

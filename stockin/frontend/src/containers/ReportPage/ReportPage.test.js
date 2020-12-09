import React from 'react';
import { render, screen, fireEvent, queryByTestId, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { api } from '../../api/index';
import { history } from '../../store/store';
import ReportPage from './ReportPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';
import * as stock from '../../store/stock/stock';


jest.mock('../../components/Header/Header', () => {
  return jest.fn((props) => {
    return <div className="spyHeader">a</div>;
  });
});

jest.mock('../../components/Footer/Footer', () => {
  return jest.fn((props) => {
    return <div className="spyFooter">a</div>;
  });
});

let mockStockInfo = [];
let mockNews = [];
let mockStockHistory = [];

const mockStockInfoItem = {
  id : 1,
  rank : '1',
  title : 'test_title',
  isKOSPI : true,
  code : '1',
  price : '1',
  yesterdayPrice : '1',
  score : '1'
};  

const mockNewsItem = {
  id : '1',
  link : 'test_link',
  title : 'test_title',
  press : 'test_press',
  date : '2020-12-02',
};

const mockStockHistoryItem = {
  id : 1,
  date : '2020-12-02',
  endPrice : '1000',
}

for(let i = 0; i < 100; i++) {
  mockStockInfo.push(mockStockInfoItem);
  mockNews.push(mockNewsItem);
  mockStockHistory.push(mockStockHistoryItem);
}

const mockUp = { stockinfo: mockStockInfo, news: mockNews, stockhistory: mockStockHistory };
const mockDown = { stockinfo: mockStockInfo, news: mockNews, stockhistory: mockStockHistory };

const mockStore = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [], up: mockUp, down : mockDown },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
const mockStoreLogout = getMockStore(
  { loggingIn: false, user: {} },
  { stockList: [], up: { stockinfo: [], news: [], stockhistory: [] }, down: { stockinfo: [], news: [], stockhistory: [] } },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
const mockStoreUndefined = getMockStore(
  { loggingIn: undefined, user: null },
  { stockList: [], up: { stockinfo: [], news: [], stockhistory: [] }, down: { stockinfo: [], news: [], stockhistory: [] } },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);

describe('<ReportPage />', () => {
  let reportPage;
  let reportPageLogout; 
  let reportPageUndefined;
  let spyGet;
  let spyHistoryPush;
  let spyCheckLogin;
  let spyUpStockInfo;
  let spyUpNews;
  let spyUpStockHistory;
  let spyDownStockInfo;
  let spyDownNews;
  let spyDownStockHistory;

  beforeEach(() => {
    reportPage = (
      <Provider store={mockStore}>
        <ReportPage history={history} />
      </Provider>
    );

    reportPageLogout = (
      <Provider store={mockStoreLogout}>
        <ReportPage history={history} />
      </Provider>
    );

    reportPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <ReportPage history={history} />
      </Provider>
    );

    spyGet = jest.spyOn(api, 'get').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
            let result;
            result = {
                status: 200,
                data : []
            };
            resolve(result);
      });
    });

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyUpStockInfo = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyUpNews = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyUpStockHistory = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyDownStockInfo = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyDownNews = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    spyDownStockHistory = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
  });

  it('should render without errors', () => {
    const { container } = render(reportPage);
    const query = queryAllByTestId(container, 'ReportPage');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    render(reportPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    render(reportPageUndefined);
    expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  });

  it('should change tab when Up clicked', () => {
    const { container } = render(reportPage);
    fireEvent.click(screen.getByText(/매수 추천/i));
  });

  it('should change tab when Down clicked', () => {
    const { container } = render(reportPage);
    fireEvent.click(screen.getByText(/매도 추천/i));
  });
});

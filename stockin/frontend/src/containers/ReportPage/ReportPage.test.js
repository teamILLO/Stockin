import React from 'react';
import { render, screen, fireEvent, queryByTestId, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { history } from '../../store/store';
import ReportPage from './ReportPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

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

jest.mock('../../components/StockReportBlock/StockReportBlock', () => {
  return jest.fn((props) => {
    return <div className="spyReportBlock">{props.id}</div>;
  });
});

// const initialAuthState = { loggingIn: true, user: {} };
// const initialAuthStateLogout = { loggingIn: false, user: null };
// const initialAuthStateUndefined = { loggingIn: undefined, user: null };
const mockStore = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [], scrollData : [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
const mockStoreLogout = getMockStore(
  { loggingIn: false, user: {} },
  { stockList: [], scrollData : [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
const mockStoreUndefined = getMockStore(
  { loggingIn: undefined, user: null },
  { stockList: [], scrollData : [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);

describe('<ReportPage />', () => {
  let reportPage, reportPageLogout, reportPageUndefined, spyHistoryPush, spyCheckLogin;

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

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });

    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
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
    expect(queryByTestId(container, 'upTab')).toHaveClass('active');
    expect(queryByTestId(container, 'downTab')).not.toHaveClass('active');
  });

  it('should change tab when Down clicked', () => {
    const { container } = render(reportPage);
    fireEvent.click(screen.getByText(/매도 추천/i));
    expect(queryByTestId(container, 'upTab')).not.toHaveClass('active');
    expect(queryByTestId(container, 'downTab')).toHaveClass('active');
  });
});

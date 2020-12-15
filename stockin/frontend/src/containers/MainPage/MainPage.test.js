import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';
import { api } from '../../api/index';
import * as redux from 'react-redux';

const initialAuthState = { loggingIn: true, user: { id: 1 } };
const initialAuthState2 = {
  groupList: [
    { id: 2, name: 'custom group2', stocks: [{ id: 2 }] },
    { id: 1, name: 'custom group1', stocks: [{ id: 1 }] },
  ],
};
const initialAuthStateLogout = { loggingIn: false, user: null };
const initialAuthStateUndefined = { loggingIn: undefined, user: null };
const mockStore = getMockStore(initialAuthState, initialAuthState2);
const mockStoreLogout = getMockStore(initialAuthStateLogout);
const mockStoreUndefined = getMockStore(initialAuthStateUndefined);

jest.mock('../../components/Header/Header', () => {
  return jest.fn((props) => {
    return <div className="spyHeader"></div>;
  });
});

jest.mock('../../components/Footer/Footer', () => {
  return jest.fn((props) => {
    return <div className="spyFooter"></div>;
  });
});

jest.mock('../../components/StockBlock/StockBlock', () => {
  return jest.fn((props) => {
    return <div className="stockBlock" data-testid="StockBlock"></div>;
  });
});

jest.mock('react-slick', () => {
  return jest.fn((props) => {
    return <div></div>;
  });
});

describe('<MainPage />', () => {
  let mainPage, mainPageLogout, mainPageUndefined, spyHistoryPush, spyCheckLogin, spyGet;

  beforeEach(() => {
    mainPage = (
      <Provider store={mockStore}>
        <MainPage history={history} />
      </Provider>
    );

    mainPageLogout = (
      <Provider store={mockStoreLogout}>
        <MainPage history={history} />
      </Provider>
    );

    mainPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <MainPage history={history} />
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });

    spyGet = jest.spyOn(api, 'get').mockImplementation((url) => {
      if (url === '/groups/')
        return new Promise((resolve, reject) => {
          let result;
          result = {
            data: [
              { id: 1, name: 'custom group1', stocks: [{ id: 1 }] },
              { id: 2, name: 'custom group2', stocks: [{ id: 2 }] },
              { id: 3, name: 'custom group3', stocks: [{ id: 3 }] },
            ],

            status: 203,
          };
          resolve(result);
        });
      return new Promise((resolve, reject) => {
        let result;

        result = {
          data: [
            { id: 1, score: 1 },
            { id: 2, score: 1 },
            { id: 3, score: 1 },
            { id: 4, score: 1 },
            { id: 5, score: 1 },
          ],

          status: 203,
        };
        resolve(result);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect when loggingIn = false or loggingIn = undefined', () => {
    render(mainPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);

    render(mainPageUndefined);
    expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  });

  it('should change tab when click tab', () => {
    const useDispatchSpy = jest
      .spyOn(redux, 'useSelector')
      .mockImplementation(() => ({ loggingIn: true, groupList: [] }));
    const { container } = render(mainPage);

    fireEvent.click(screen.getByText('DailyReport'));
    fireEvent.click(screen.getByText('DailyReport'));
    fireEvent.click(screen.getByText('MyInterests'));
    fireEvent.click(screen.getByText('MyInterests'));

    fireEvent.click(screen.getByTestId('addGroup'));
  });

  it('should show addStock', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useSelector').mockImplementation(() => ({
      loggingIn: true,
      groupList: [{ id: 1, name: 'custom group1', stocks: [] }],
    }));
    const { container } = render(mainPage);

    fireEvent.click(screen.getByText('DailyReport'));
    fireEvent.click(screen.getByText('DailyReport'));
    fireEvent.click(screen.getByText('MyInterests'));
    fireEvent.click(screen.getByText('MyInterests'));

    fireEvent.click(screen.getByTestId('addStock'));
  });

  it('should show group list', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(() => ({
      loggingIn: true,
      groupList: [
        { id: 1, name: 'custom group1', stocks: [{ id: 1 }, { id: 1 }] },
        { id: 2, name: 'custom group2', stocks: [] },
      ],
    }));
    render(mainPage);

    fireEvent.click(screen.getByText('DailyReport'));
    fireEvent.click(screen.getByText('DailyReport'));
    fireEvent.click(screen.getByText('MyInterests'));
    fireEvent.click(screen.getByText('MyInterests'));
  });
});

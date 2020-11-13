import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: true, user: { id: 1 } };
const initialAuthStateLogout = { loggingIn: false, user: null };
const initialAuthStateUndefined = { loggingIn: undefined, user: null };
const mockStore = getMockStore(initialAuthState);
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

describe('<MainPage />', () => {
  let mainPage, mainPageLogout, mainPageUndefined, spyHistoryPush, spyCheckLogin;

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
  });

  it('should render without errors', () => {
    const { container } = render(mainPage);
    const query = queryAllByTestId(container, 'MainPage');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    render(mainPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    render(mainPageUndefined);
    expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  });
});

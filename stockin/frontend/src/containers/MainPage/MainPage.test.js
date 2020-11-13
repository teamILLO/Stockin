import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const initialAuthStateUndefined = { loggingIn: undefined };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);
const mockStoreUndefined = getMockStore(initialAuthStateUndefined);

describe('<MainPage />', () => {
  let mainPage, mainPageLogout, mainPageUndefined, spyHistoryPush;
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

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {});
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
    const spyCheckLoginHandler = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    render(mainPageUndefined);
    expect(spyCheckLoginHandler).toHaveBeenCalledTimes(1);
  });
});

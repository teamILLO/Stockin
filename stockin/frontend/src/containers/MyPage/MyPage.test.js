import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import MyPage from './MyPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const initialAuthStateUndefined = { loggingIn: undefined };
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

jest.mock('../../components/MyPage/MyInterests/MyInterests', () => {
  return jest.fn((props) => {
    return <div data-testid="spyMyInterests"></div>;
  });
});

jest.mock('../../components/MyPage/MyInterestsDetail/MyInterestsDetail', () => {
  return jest.fn((props) => {
    return <div data-testid="spyInterestsDetail"></div>;
  });
});

jest.mock('../../components/MyPage/MyInfo/MyInfo', () => {
  return jest.fn((props) => {
    return <div data-testid="spyMyInfo"></div>;
  });
});

describe('<MyPage />', () => {
  let myPage, myPageLogout, myPageUndefined, spyHistoryPush, spyTrySignout, spyCheckLogin;

  beforeEach(() => {
    myPage = (
      <Provider store={mockStore}>
        <MyPage history={history} />
      </Provider>
    );

    myPageLogout = (
      <Provider store={mockStoreLogout}>
        <MyPage history={history} />
      </Provider>
    );

    myPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <MyPage history={history} />
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });

    spyTrySignout = jest.spyOn(authentication, 'trySignout').mockImplementation((user) => {
      return (dispatch) => {};
    });

    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
  });

  it('should render without errors', () => {
    const { container } = render(myPage);
    const query = queryAllByTestId(container, 'MyPage');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    render(myPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickSignoutHandler when clicking signout button', () => {
    render(myPage);
    fireEvent.click(screen.getAllByText(/signout/i, { selector: 'button' })[0]);
    expect(spyTrySignout).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    render(myPageUndefined);
    expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  });

  it('should change tab when My Interests Detail clicked', () => {
    const { container } = render(myPage);
    fireEvent.click(screen.getByText(/my Interests detail/i));
    const query = queryAllByTestId(container, 'spyInterestsDetail');
    expect(query.length).toBe(1);
  });

  it('should change tab when My Information clicked', () => {
    const { container } = render(myPage);
    fireEvent.click(screen.getByText(/my information/i));
    const query = queryAllByTestId(container, 'spyMyInfo');
    expect(query.length).toBe(1);
  });
});

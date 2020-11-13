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

describe('<MyPage />', () => {
  let myPage, myPageLogout, myPageUndefined, spyHistoryPush;
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
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {});
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
    const spySignoutHandler = jest
      .spyOn(authentication, 'trySignout')
      .mockImplementation((user) => {
        return (dispatch) => {};
      });
    render(myPage);
    fireEvent.click(screen.getAllByText(/signout/i, { selector: 'button' })[0]);
    expect(spySignoutHandler).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    const spyCheckLoginHandler = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    render(myPageUndefined);
    expect(spyCheckLoginHandler).toHaveBeenCalledTimes(1);
  });
});

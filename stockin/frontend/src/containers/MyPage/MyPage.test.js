import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { history } from '../../store/store';
import MyPage from './MyPage';
import { getMockStore } from '../../test-utils/mocks';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);

describe('<MyPage />', () => {
  let myPage, myPageLogout, spyHistoryPush;
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

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
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
});

import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);

describe('<MainPage />', () => {
  let mainPage, mainPageLogout, spyHistoryPush;
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

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
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
});

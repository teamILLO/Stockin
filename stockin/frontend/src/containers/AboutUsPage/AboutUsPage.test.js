import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import AboutUsPage from './AboutUsPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const initialAuthStateUndefined = { loggingIn: undefined };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);
const mockStoreUndefined = getMockStore(initialAuthStateUndefined);

describe('<AboutUsPage />', () => {
  let aboutUsPage, aboutUsPageLogout, aboutUsPageUndefined, spyHistoryPush;
  beforeEach(() => {
    aboutUsPage = (
      <Provider store={mockStore}>
        <AboutUsPage history={history} />
      </Provider>
    );

    aboutUsPageLogout = (
      <Provider store={mockStoreLogout}>
        <AboutUsPage history={history} />
      </Provider>
    );

    aboutUsPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <AboutUsPage history={history} />
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
  });

  it('should render without errors', () => {
    const { container } = render(aboutUsPage);
    const query = queryAllByTestId(container, 'AboutUsPage');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    render(aboutUsPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    const spyCheckLoginHandler = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    render(aboutUsPageUndefined);
    expect(spyCheckLoginHandler).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import AboutUsPage from './AboutUsPage';
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

describe('<AboutUsPage />', () => {
  let aboutUsPage, aboutUsPageLogout, aboutUsPageUndefined, spyHistoryPush, spyCheckLogin;

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

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {});

    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
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
    render(aboutUsPageUndefined);
    expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  });
});

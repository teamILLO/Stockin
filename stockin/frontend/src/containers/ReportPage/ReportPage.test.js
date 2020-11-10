import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import ReportPage from './ReportPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const initialAuthStateUndefined = { loggingIn: undefined };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);
const mockStoreUndefined = getMockStore(initialAuthStateUndefined);

describe('<ReportPage />', () => {
  let reportPage, reportPageLogout, reportPageUndefined, spyHistoryPush;
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
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
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
    const spyCheckLoginHandler = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    render(reportPageUndefined);
    expect(spyCheckLoginHandler).toHaveBeenCalledTimes(1);
  });
});

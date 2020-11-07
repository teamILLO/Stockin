import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { history } from '../../store/store';
import ReportPage from './ReportPage';
import { getMockStore } from '../../test-utils/mocks';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);

describe('<ReportPage />', () => {
  let reportPage, reportPageLogout, spyHistoryPush;
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
});

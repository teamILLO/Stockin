import React from 'react';
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  queryAllByTestId,
  queryByTestId,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from './Header';
import store, { history } from '../../store/store';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: false, user: null };
const mockStore = getMockStore(initialAuthState);

describe('<Header />', () => {
  let header;

  beforeEach(() => {
    header = (
      <Provider store={mockStore}>
        <Header history={history} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = render(header);
    const query = queryAllByTestId(container, 'Header');
    expect(query.length).toBe(1);
  });

  it('should call onClickNavHandler when clicking Logo', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'Logo');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking REPORT', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'Report');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking MY PAGE', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'Mypage');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking ABOUT US', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'AboutUs');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickLogoutHandler when clicking logout button', () => {
    const spyLogoutHandler = jest.spyOn(authentication, 'tryLogout').mockImplementation((user) => {
      return (dispatch) => {};
    });
    render(header);
    fireEvent.click(screen.getAllByText(/logout/i, { selector: 'button' })[0]);
    expect(spyLogoutHandler).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking Logo in StickyHeader', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'stickyLogo');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking REPORT in StickyHeader', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'stickyReport');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking MY PAGE in StickyHeader', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    const { container } = render(header);
    const button = getByTestId(container, 'stickyMypage');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});

describe('<Header />', () => {
  let app;
  beforeEach(() => {
    app = (
      <Provider store={store}>
        <Header />
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
        <div>ReportPage</div>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = render(app);
    const query = queryAllByTestId(container, 'Header');
    expect(query.length).toBe(1);
    expect(queryByTestId(container, 'StickyHeader')).toHaveClass('hidden');

    fireEvent.scroll(window, { target: { scrollY: 2000 } });
    expect(queryByTestId(container, 'StickyHeader')).toBeVisible();

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(queryByTestId(container, 'StickyHeader')).toBeVisible();
  });
});

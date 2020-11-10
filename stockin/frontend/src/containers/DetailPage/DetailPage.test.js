import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import DetailPage from './DetailPage';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const initialAuthStateUndefined = { loggingIn: undefined };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);
const mockStoreUndefined = getMockStore(initialAuthStateUndefined);

describe('<DetailPage />', () => {
  let detailPage, detailPageLogout, detailPageUndefined, spyHistoryPush;
  beforeEach(() => {
    detailPage = (
      <Provider store={mockStore}>
        <DetailPage history={history} />
      </Provider>
    );

    detailPageLogout = (
      <Provider store={mockStoreLogout}>
        <DetailPage history={history} />
      </Provider>
    );

    detailPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <DetailPage history={history} />
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
  });

  it('should render without errors', () => {
    const { container } = render(detailPage);
    const query = queryAllByTestId(container, 'DetailPage');
    expect(query.length).toBe(1);
  });

  test('should change tab when clicked News', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/news/i));
    const query = queryAllByTestId(container, 'DetailNews');
    expect(query.length).toBe(1);
  });

  test('should change tab when clicked Price Trends', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/price trends/i));
    const query = queryAllByTestId(container, 'DetailPriceTrends');
    expect(query.length).toBe(1);
  });

  test('should change tab when clicked FiancialState', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/financial state/i));
    const query = queryAllByTestId(container, 'DetailFinancialState');
    expect(query.length).toBe(1);
  });

  test('should change tab when clicked Comments', () => {
    const { container } = render(detailPage);
    fireEvent.click(screen.getByText(/comments/i));
    const query = queryAllByTestId(container, 'DetailComment');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    render(detailPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should dispatch checkLogin when loggingIn = undefined', () => {
    const spyCheckLoginHandler = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });
    render(detailPageUndefined);
    expect(spyCheckLoginHandler).toHaveBeenCalledTimes(1);
  });
});

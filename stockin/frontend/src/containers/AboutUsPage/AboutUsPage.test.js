import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import AboutUsPage from './AboutUsPage';
import { getMockStore } from '../../test-utils/mocks';

const initialAuthState = { loggingIn: true };
const initialAuthStateLogout = { loggingIn: false };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);

describe('<AboutUsPage />', () => {
  let aboutUsPage, aboutUsPageLogout, spyHistoryPush;
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

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
  });

  it('should render without errors', () => {
    const { container } = render(aboutUsPage);
    const query = queryAllByTestId(container, 'AboutUsPage');
    expect(query.length).toBe(1);
  });

  it('should redirect when loggingIn = false', () => {
    const { container } = render(aboutUsPageLogout);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { history } from '../../store/store';
import AboutUsPage from './AboutUsPage';

// const initialAuthState = { loggingIn: true };
// const initialAuthStateLogout = { loggingIn: false };
// const mockStore = getMockStore(initialAuthState);
// const mockStoreLogout = getMockStore(initialAuthStateLogout);

describe('<AboutUsPage />', () => {
  let aboutUsPage;
  beforeEach(() => {
    aboutUsPage = (
      <Provider store={store}>
        <AboutUsPage history={history} />
      </Provider>
    );
  });
  it('should render without errors', () => {
    const { container } = render(aboutUsPage);
    const query = queryAllByTestId(container, 'AboutUsPage');
    expect(query.length).toBe(1);
  });
});

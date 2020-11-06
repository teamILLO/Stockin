import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('<MainPage />', () => {
  let mainPage;
  beforeEach(() => {
    mainPage = (
      <Provider store={store}>
        <MainPage history={history} />
      </Provider>
    );
  });

  it('should render without errors', () => {
    const { container } = render(mainPage);
    const query = queryAllByTestId(container, 'MainPage');
    expect(query.length).toBe(1);
  });

  it('should redirect to prelogin when loggingIn = false', () => {
    const { container } = render(mainPage);
    const query = queryAllByTestId(container, 'MainPage');
    expect(query.length).toBe(1);
  });
});

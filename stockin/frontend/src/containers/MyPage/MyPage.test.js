import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { history } from '../../store/store';
import MyPage from './MyPage';

describe('<MyPage />', () => {
  let myPage;
  beforeEach(() => {
    myPage = (
      <Provider store={store}>
        <MyPage history={history} />
      </Provider>
    );
  });
  it('should render without errors', () => {
    const { container } = render(myPage);
    const query = queryAllByTestId(container, 'MyPage');
    expect(query.length).toBe(1);
  });
});

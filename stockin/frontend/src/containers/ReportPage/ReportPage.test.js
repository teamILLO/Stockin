import React from 'react';
import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { history } from '../../store/store';
import ReportPage from './ReportPage';

describe('<ReportPage />', () => {
  let reportPage;
  beforeEach(() => {
    reportPage = (
      <Provider store={store}>
        <ReportPage history={history} />
      </Provider>
    );
  });
  it('should render without errors', () => {
    const { container } = render(reportPage);
    const query = queryAllByTestId(container, 'ReportPage');
    expect(query.length).toBe(1);
  });
});

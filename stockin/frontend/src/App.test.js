import React from 'react';
import { Provider } from 'react-redux';
import { render, queryAllByTestId } from '@testing-library/react';
import store from './store/store';

import App from './App';
import { history } from './store/store';

jest.mock('./csrftoken', () => {
  return jest.fn((props) => {
    return <div className="spyCsrftoken"></div>;
  });
});

describe('App', () => {
  let app;
  //store and history needs to be mocked
  beforeEach(() => {
    app = (
      <Provider store={store}>
        <App history={history} />
      </Provider>
    );
  });

  it('should render', () => {
    const { container } = render(app);
    const query = queryAllByTestId(container, 'App');
    expect(query.length).toBe(1);
  });

  it('should be redirected to error page', () => {
    const { container } = render(app);
    history.push('/aaa');
    const query = queryAllByTestId(container, 'NotFound');
    expect(query.length).toBe(1);
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { history } from './store/store';

/*
describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    console.log(app == undefined);
  });

  it('should render', () => {
    console.log(app);
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });
});*/

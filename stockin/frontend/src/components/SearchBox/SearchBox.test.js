import React, { Children } from 'react';
import {
  render,
  wait,
  screen,
  fireEvent,
  getByText,
  queryAllByTestId,
  getByPlaceholderText,
  getByTestId,
  getByDisplayValue,
  waitForElement,
} from '@testing-library/react';
import SearchBox from './SearchBox';
import store, { history } from '../../store/store';
import * as redux from 'react-redux';
import { Container, Menu, Button, Image, Visibility } from 'semantic-ui-react';
import { head, wrap } from 'lodash';
import { getMockStore } from '../../test_utils/mocks';
import reducer, { getStocks } from '../../store/stock';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';

const initialAuthState = {};

const initialStockState = {
  stockList : [],
};

const stubStock = [
  {"id" : 1, "title" : 'foo1_title', "code" : 'foo1_code', "sector" : 'foo1_sector'},
  {"id" : 2, "title" : 'foo2_title', "code" : 'foo2_code', "sector" : 'foo2_sector'},
];

const mockStore = getMockStore(initialAuthState, initialStockState);

describe('<SearchBox />', () => {
  let searchbox, spy;
  
  beforeEach(() => {
    searchbox = (
      <redux.Provider store={mockStore}>
        <SearchBox history={history}/>
      </redux.Provider>
    );
    
    jest.spyOn(axios, "get").mockImplementation(() => {
      const response = {
        status : 200,
        data : stubStock,
      };
      return Promise.resolve(response);
    });
    spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ stockList: [{"id" : 1, "title" : 'foo1_title', "code" : 'foo1_code', "sector" : 'foo1_sector'},
    {"id" : 2, "title" : 'foo2_title', "code" : 'foo2_code', "sector" : 'foo2_sector'},] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should work', async () => {
    const {debug, getByText} = render(searchbox);
    const query = document.body.querySelector('.prompt');
    fireEvent.change(query, {target : {value : 'foo1_title'}});
    fireEvent.change(query, {target : {value : ''}});
    await wait(() => getByText('foo1_title'));
    debug();
  });

  it('should work', async () => {
    const {debug, getByText} = render(searchbox);
    const query = document.body.querySelector('.prompt');
    fireEvent.change(query, {target : {value : 'foo1_title'}});
    const text = await waitForElement(() => getByText('foo1_title'));
    expect(text).toHaveTextContent('foo1_title');
    debug();
  });
});
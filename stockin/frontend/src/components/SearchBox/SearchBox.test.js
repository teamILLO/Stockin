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
  unmount
} from '@testing-library/react';
import SearchBox from './SearchBox';
import store, { history } from '../../store/store';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { Container, Menu, Button, Image, Visibility } from 'semantic-ui-react';
import { head, wrap } from 'lodash';
import { getMockStore } from '../../test-utils/mocks';
import reducer, { getStocks } from '../../store/stock/stock';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';
import { timeDay } from 'd3-time';


 
// const localStorageMock = {
//   getItem: jest.fn(a=>{
//     return ['{ "id": 1, "title" : "foo1_title", "code" : "foo1_code", "sector" : "foo1_sector"}']
//   }),
//   setItem: jest.fn(),
//   clear: jest.fn()
// };

// global.localStorage =  localStorageMock;


const initialAuthState = {};

const initialStockState = {
  stockList: [{"id" : 1, "title" : 'foo1_title', "code" : 'foo1_code', "sector" : 'foo1_sector'},
    {"id" : 2, "title" : 'foo2_title', "code" : 'foo2_code', "sector" : 'foo2_sector'},] 
};

const stubStock = [
  {"id" : 1, "title" : 'foo1_title', "code" : 'foo1_code', "sector" : 'foo1_sector'},
  {"id" : 2, "title" : 'foo2_title', "code" : 'foo2_code', "sector" : 'foo2_sector'},
];

const mockStore = getMockStore(initialAuthState, initialStockState);

describe('<SearchBox />', () => {
  let searchbox, spy, spyHistoryPush, parser;
  jest.useFakeTimers();

  beforeEach(() => {
    searchbox = (
      <Provider store={mockStore} >
        <SearchBox history={history}/>
      </Provider>
    );
   
    

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    

    jest.spyOn(axios, "get").mockImplementation(() => {
      const response = {
        status : 200,
        data : stubStock,
      };
      return Promise.resolve(response);
    });

 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it should render without errors',  () => {
    const { container, getByText, unmount, debug }= render(searchbox);
    const query = document.body.querySelector('.prompt');
    fireEvent.change(query, {target : {value : 'foo1_title'}});
    screen.localStorage = {         setItem: jest.fn(()=>[{"id":1}])       };
    let text;
    jest.useFakeTimers();
    setTimeout(() => {
      text =  waitForElement(() => getByText('foo1_title'));
      
    }, 3000);
    jest.runAllTimers();
    // expect(text).toHaveTextContent('');

    fireEvent.change(query, {target : {value : ''}});

    jest.useFakeTimers();
    setTimeout(() => {
      text =  waitForElement(() => getByText(''));
      
    }, 3000);
    jest.runAllTimers();

    fireEvent.change(query, {target : {value : 'foo1_title'}});

  
    jest.useFakeTimers();
    setTimeout(() => {
      text =  waitForElement(() => getByText('foo1_title'));
      
    }, 3000);
    jest.runAllTimers();

    
    jest.useFakeTimers();
    setTimeout(() => {
      fireEvent.keyDown(query, { key: 'ArrowDown', code: 'ArrowDown' })
    }, 3000);
    jest.runAllTimers();

    jest.useFakeTimers();
    setTimeout(() => {
      fireEvent.keyDown(query, { key: 'Enter', code: 'Enter' })
    }, 3000);
    jest.runAllTimers();

    jest.useFakeTimers();
    setTimeout(() => {
      text =  waitForElement(() => getByText(''));
      
    }, 3000);
    jest.runAllTimers();

    fireEvent.change(query, {target : {value : 'foo2_title'}});

  
    jest.useFakeTimers();
    setTimeout(() => {
      text =  waitForElement(() => getByText('foo2_title'));
      
    }, 3000);
    jest.runAllTimers();

    
    jest.useFakeTimers();
    setTimeout(() => {
      fireEvent.keyDown(query, { key: 'ArrowDown', code: 'ArrowDown' })
    }, 3000);
    jest.runAllTimers();

    jest.useFakeTimers();
    setTimeout(() => {
      fireEvent.keyDown(query, { key: 'Enter', code: 'Enter' })
    }, 3000);
    jest.runAllTimers();

    jest.useFakeTimers();
    setTimeout(() => {
      text =  waitForElement(() => getByText(''));
      
    }, 3000);
    jest.runAllTimers();

    unmount()
    debug()
  });

  
  it('it should unmount', async () => {
    const {unmount} = render(searchbox);
    
    unmount();
  })
});
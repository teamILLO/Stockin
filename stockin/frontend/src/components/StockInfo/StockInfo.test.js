import React from 'react';
import { render, queryAllByTestId, screen, fireEvent } from '@testing-library/react';
import StockInfo from './StockInfo';
import { api } from '../../api/index';
import { history } from '../../store/store';

describe('<StockBlock />', () => {
  let spyPost, spyHistory;
  beforeEach(() => {
    spyPost = jest.spyOn(api, 'get').mockImplementation(() => {
      return new Promise((resolve, reject) => {
          let result
          
          result = {
            data:{
                  'title' :'test',
                  'isKOSPI' : 'KOSPI',
                  'code' : 123456,
                  'price' : 100,
                  'yesterdayPrice' : 99,
                  'startPrice' : 100,
                  'highestPrice' : 100,
                  'lowestPrice' : 90,
                  'tradeVolume' : 1,
                  'tradeValue' : 1,
                  'amount' : 11,

                },  
            status: 203,
          }
          resolve(result);
      });
    });


  });

  it('should render without errors', () => {
    const { container } = render(<StockInfo id={1}/>);
    const query = queryAllByTestId(container, 'StockInfo');
    expect(query.length).toBe(1);
  });

  it('should render without errors', () => {
    
    spyPost = jest.spyOn(api, 'get').mockImplementation(() => {
      return new Promise((resolve, reject) => {
          let result
          
          result = {
            data:{
                  'title' :'test',
                  'isKOSPI' : 'KOSPI',
                  'code' : 123456,
                  'price' : 100,
                  'yesterdayPrice' : 100,
                  'startPrice' : 100,
                  'highestPrice' : 100,
                  'lowestPrice' : 90,
                  'tradeVolume' : 1,
                  'tradeValue' : 1,
                  'amount' : 11,

                },  
            status: 203,
          }
          resolve(result);
      });
    });
    const { container } = render(<StockInfo id={1}/>);
    const query = queryAllByTestId(container, 'StockInfo');
    expect(query.length).toBe(1);
  });

  it('should render without errors', () => {
    
    spyPost = jest.spyOn(api, 'get').mockImplementation(() => {
      return new Promise((resolve, reject) => {
          let result
          
          result = {
            data:{
                  'title' :'test',
                  'isKOSPI' : 'KOSPI',
                  'code' : 123456,
                  'price' : 99,
                  'yesterdayPrice' : 100,
                  'startPrice' : 100,
                  'highestPrice' : 100,
                  'lowestPrice' : 90,
                  'tradeVolume' : 1,
                  'tradeValue' : 1,
                  'amount' : 11,

                },  
            status: 203,
          }
          resolve(result);
      });
    });
    const { container } = render(<StockInfo id={1}/>);
    const query = queryAllByTestId(container, 'StockInfo');
    expect(query.length).toBe(1);
  });


});

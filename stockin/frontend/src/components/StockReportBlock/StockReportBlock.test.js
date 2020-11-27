import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import StockReportBlock from './StockReportBlock';
import { api } from '../../api/index';

const testList = [
    { stock: '1', date: 'date1', open: '1', high: '10', low: '1', close: '3' },
    { stock: '2', date: 'date1', open: '1', high: '10', low: '1', close: '3' },
    { stock: '3', date: 'date1', open: '1', high: '10', low: '1', close: '3' },
];


describe('<StockReportBlock />', () => {
  let spyPost;
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
                  'yesterdayPrice' : 99
                },  
            status: 203,
          }
          resolve(result);
      });
    });
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should render without errors', () => {
    const { container } = render(<StockReportBlock id={1}/>);
    const query = queryAllByTestId(container, 'StockReportBlock');
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
                  'yesterdayPrice' : 101
                },  
            status: 203,
          }
          resolve(result);
      });
    });
    const { container } = render(<StockReportBlock id={1}/>);
    const query = queryAllByTestId(container, 'StockReportBlock');
    expect(query.length).toBe(1);
  });

  it('should render without errors', () => {
    spyPost = jest.spyOn(api, 'get').mockImplementation(() => {
      return new Promise((resolve, reject) => {
          let result
          result = {
            status: 404,
          }
          reject(result);
      });
    });
    const { container } = render(<StockReportBlock id={1}/>);
    const query = queryAllByTestId(container, 'StockReportBlock');
    expect(query.length).toBe(1);
  });
});

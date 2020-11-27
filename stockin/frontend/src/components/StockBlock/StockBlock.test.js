import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import StockBlock from './StockBlock';
import { api } from '../../api/index';

describe('<StockBlock />', () => {
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
  });

  it('should render without errors', () => {
    const { container } = render(<StockBlock id={1}/>);
    const query = queryAllByTestId(container, 'StockBlock');
    expect(query.length).toBe(1);
  });

  it('should render without errors', () => {
    const { container } = render(<StockBlock />);
    const query = queryAllByTestId(container, 'StockBlock');
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
    const { container } = render(<StockBlock id={1}/>);
    const query = queryAllByTestId(container, 'StockBlock');
    expect(query.length).toBe(1);
  });
});

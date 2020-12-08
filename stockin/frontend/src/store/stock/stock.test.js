import { api } from '../../api/index';
import stock, { updateStockList, getStocks, getScrollData, updateScrollData } from './stock';
import store from '../store';

const testList = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const testScrollData = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

describe('stock ', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(stock(undefined, {})).toEqual({
      stockList: [],
      scrollData: [],
    });
  });

  it('should handle updateStockList', () => {
    expect(
      stock(
        {
          stockList: [],
          scrollData: []
        },
        {
          type: updateStockList.type,
          payload: testList,
        },
      ),
    ).toEqual({
      stockList: testList,
      scrollData :[]
    });
  });

  it(`should work when 'getStocks' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testList,
        };
        resolve(result);
      });
    });

    store.dispatch(getStocks()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getStocks' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getStocks()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should handle updateScrollData', () => {
    expect(
      stock(
        {
          stockList: [],
          scrollData: []
        },
        {
          type: updateScrollData.type,
          payload: testScrollData,
        },
      ),
    ).toEqual({
      stockList: [],
      scrollData :testScrollData,
    });
  });

  it(`should work when 'getScrollData' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testScrollData,
        };
        resolve(result);
      });
    });

    store.dispatch(getScrollData(0)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getStocks' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getScrollData(0)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

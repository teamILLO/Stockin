import { api } from '../../api/index';
import stockHistory, { updatePriceList, getStockHistory } from './stockHistory';
import store from '../store';

const testList = [
  { stock: '1', date: 'date1', open: '1', high: '10', low: '1', close: '3', volume: '1' },
  { stock: '2', date: 'date1', open: '1', high: '10', low: '1', close: '3', volume: '2' },
  { stock: '3', date: 'date1', open: '1', high: '10', low: '1', close: '3', volume: '3' },
];
const testListZero = [
  { stock: '1', date: 'date1', open: '1', high: '1', low: '1', close: '1', volume: '0' },
  { stock: '2', date: 'date1', open: '1', high: '1', low: '1', close: '1', volume: '0' },
  { stock: '3', date: 'date1', open: '1', high: '1', low: '1', close: '1', volume: '0' },
];

describe('stockHistory ', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(stockHistory(undefined, {})).toEqual({
      priceList: [],
    });
  });

  it('should handle updatePriceList', () => {
    expect(
      stockHistory(
        {
          priceList: [],
        },
        {
          type: updatePriceList.type,
          payload: testList,
        },
      ),
    ).toEqual({
      priceList: testList,
    });
  });

  it('should handle updatePriceList when volume is zero', () => {
    expect(
      stockHistory(
        {
          priceList: [],
        },
        {
          type: updatePriceList.type,
          payload: testListZero,
        },
      ),
    ).toEqual({
      priceList: testListZero,
    });
  });

  it(`should work when 'updatePriceList' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: testList,
        };
        resolve(result);
      });
    });

    store.dispatch(getStockHistory(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'updatePriceList' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getStockHistory(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

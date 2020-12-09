import { api } from '../../api/index';
import stock, { 
  updateStockList, 
  updateUpStockInfo, 
  updateUpNews,
  updateUpStockHistory,
  updateDownStockInfo,
  updateDownNews,
  updateDownStockHistory,
  getStocks, 
  getUpStockInfo,
  getUpNews,
  getUpStockHistory,
  getDownStockInfo,
  getDownNews,
  getDownStockHistory,
} from './stock';
import store from '../store';


const testList = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const testStockInfo = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const testNews = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const testStockHistory = [
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

  /**
   * Reducer tests
   */
  it('should handle initial state', () => {
    expect(stock(undefined, {})).toEqual({
      stockList: [],
      up : { stockinfo : [], news : [], stockhistory : []},
      down : { stockinfo : [], news : [], stockhistory : []},
    });
  });

  it('should handle updateStockList', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateStockList.type,
          payload: testList,
        },
      ),
    ).toEqual({
      stockList: testList,
      up : { stockinfo : [], news : [], stockhistory : []},
      down : { stockinfo : [], news : [], stockhistory : []},
    });
  });

  it('should handle updateUpStockInfo', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateUpStockInfo.type,
          payload: testStockInfo,
        },
      ),
    ).toEqual({
      stockList: [],
      up : { stockinfo : testStockInfo, news : [], stockhistory : []},
      down : { stockinfo : [], news : [], stockhistory : []},
    });
  });

  it('should handle updateDownStockInfo', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateDownStockInfo.type,
          payload: testStockInfo,
        },
      ),
    ).toEqual({
      stockList: [],
      up : { stockinfo : [], news : [], stockhistory : []},
      down : { stockinfo : testStockInfo, news : [], stockhistory : []},
    });
  });

  it('should handle updateUpNews', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateUpNews.type,
          payload: testNews,
        },
      ),
    ).toEqual({
      stockList: [],
      up : { stockinfo : [], news : testNews, stockhistory : []},
      down : { stockinfo : [], news : [], stockhistory : []},
    });
  });

  it('should handle updateDownNews', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateDownNews.type,
          payload: testNews,
        },
      ),
    ).toEqual({
      stockList: [],
      up : { stockinfo : [], news : [], stockhistory : []},
      down : { stockinfo : [], news : testNews, stockhistory : []},
    });
  });

  it('should handle updateUpStockHistory', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateUpStockHistory.type,
          payload: testStockHistory,
        },
      ),
    ).toEqual({
      stockList: [],
      up : { stockinfo : [], news : [], stockhistory : testStockHistory},
      down : { stockinfo : [], news : [], stockhistory : []},
    });
  });

  it('should handle updateUpStockHistory', () => {
    expect(
      stock(
        {
          stockList: [],
          up : { stockinfo : [], news : [], stockhistory : []},
          down : { stockinfo : [], news : [], stockhistory : []},
        },
        {
          type: updateDownStockHistory.type,
          payload: testStockHistory,
        },
      ),
    ).toEqual({
      stockList: [],
      up : { stockinfo : [], news : [], stockhistory : []},
      down : { stockinfo : [], news : [], stockhistory : testStockHistory},
    });
  });

  /**
   * Action tests
   */
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

  it(`should work when 'getUpStockInfo' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testStockInfo,
        };
        resolve(result);
      });
    });

    store.dispatch(getUpStockInfo()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getUpStockInfo' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getUpStockInfo()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'getUpNews' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testNews,
        };
        resolve(result);
      });
    });

    store.dispatch(getUpNews()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getUpNews' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getUpNews()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'getUpStockHistory' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testStockHistory,
        };
        resolve(result);
      });
    });

    store.dispatch(getUpStockHistory()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getUpStockHistory' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getUpStockHistory()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'getDownStockInfo' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testStockInfo,
        };
        resolve(result);
      });
    });

    store.dispatch(getDownStockInfo()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getDownStockInfo' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getDownStockInfo()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'getDownNews' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testNews,
        };
        resolve(result);
      });
    });

    store.dispatch(getDownNews()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getDownNews' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getDownNews()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'getDownStockHistory' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testStockHistory,
        };
        resolve(result);
      });
    });

    store.dispatch(getDownStockHistory()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getDownStockHistory' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getDownStockHistory()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
  
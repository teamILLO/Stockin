import { api } from '../../api/index';
import fs, { getfs, getFs } from './financialstats';
import store from '../store';

const testList = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const testListReverse = [
  { id: 3, name: 'c' },
  { id: 2, name: 'b' },
  { id: 1, name: 'a' },
];

describe('financialstats ', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(fs(undefined, {})).toEqual({
      fs: [],
    });
  });

  it('should handle getfs', () => {
    expect(
      fs(
        {
          fs: [],
        },
        {
          type: getfs.type,
          payload: testList,
        },
      ),
    ).toEqual({
      fs: testListReverse,
    });
  });

  it(`should work when 'getFs' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testList,
        };
        resolve(result);
      });
    });

    store.dispatch(getFs(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getFs' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getFs(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

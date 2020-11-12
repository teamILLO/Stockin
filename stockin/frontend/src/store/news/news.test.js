import { api } from '../../api/index';
import news, { getnews, getNews } from './news';
import store from '../store';

const testList = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

describe('news ', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(news(undefined, {})).toEqual({
      news: [],
    });
  });

  it('should handle getnews', () => {
    expect(
      news(
        { news: [] },
        {
          type: getnews.type,
          payload: testList,
        },
      ),
    ).toEqual({
      news: testList,
    });
  });

  it(`should work when 'getNews' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testList,
        };
        resolve(result);
      });
    });

    store.dispatch(getNews(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getNews' calls with error`, (done) => {
    const spyError = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getNews(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

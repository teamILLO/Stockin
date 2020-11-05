const actual = reducer(testState, someAction);
expect(actual).toEqual(expected);

import axios from 'axios';

import authentication from './authentication';
import { tryLogin } from './authentication';

describe('authentication ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should work when 'tryLogin' calls`, () => {
    const spy = jest.spyOn(axios, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          loggingIn: true,
          data: stubArticle,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    const actual = authentication();
  });
});

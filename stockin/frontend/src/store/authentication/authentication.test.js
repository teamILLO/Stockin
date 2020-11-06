// const actual = reducer(testState, someAction);
// expect(actual).toEqual(expected);

import axios from 'axios';

import authentication from './authentication';
import { tryLogin } from './authentication';

describe('authentication ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should work when 'tryLogin' calls`, () => {
    const spyLogin = jest.spyOn(axios, 'post').mockImplementation((user) => {
      return (dispatch) => {};
    });

    const actual = authentication(
      { loggingIn: false, userid: 0 },
      tryLogin({ email: 'email', password: 'password' }),
    );
    // expect(actual).toEqual({ loggingIn: true, userid: 1 });
  });
});

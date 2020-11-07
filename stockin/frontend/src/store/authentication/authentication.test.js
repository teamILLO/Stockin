// const actual = reducer(testState, someAction);
// expect(actual).toEqual(expected);

import axios from 'axios';

import authentication from './authentication';
import * as actions from './authentication';

describe('authentication ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should work when 'tryLogin' calls`, () => {
    const spyLogin = jest.spyOn(axios, 'post').mockImplementation((user) => {
      return (dispatch) => {};
    });
    const user = { email: 'email', password: 'password', nickname: 'nickname' };
    const actual = authentication({ loggingIn: false, user: null }, actions.login(user));
    expect(actual).toEqual({ loggingIn: true, user: user });
  });
});

import { api } from '../../api/index';

import authentication, {
  login,
  logout,
  tryLogin,
  checkLogin,
  tryLogout,
  trySignup,
  trySignout,
  updateUserInfo,
} from './authentication';
import store from '../store';

const testuser = {
  email: 'test@email.com',
  nickname: 'nickname',
  id: 2,
};

describe('authentication ', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(authentication(undefined, {})).toEqual({
      loggingIn: undefined,
      user: null,
    });
  });

  it('should handle LOGIN', () => {
    expect(
      authentication(
        {
          loggingIn: undefined,
          user: null,
        },
        {
          type: login.type,
          payload: testuser,
        },
      ),
    ).toEqual({
      loggingIn: true,
      user: testuser,
    });
  });

  it('should handle LOGOUT', () => {
    expect(
      authentication(
        {
          loggingIn: undefined,
          user: null,
        },
        {
          type: logout.type,
          payload: null,
        },
      ),
    ).toEqual({
      loggingIn: false,
      user: null,
    });
  });

  it(`should work when 'tryLogin' calls`, (done) => {
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: testuser,
        };
        resolve(result);
      });
    });

    store.dispatch(tryLogin(testuser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'tryLogin' calls with error`, (done) => {
    const spyError = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(tryLogin(testuser)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'checkLogin' calls`, (done) => {
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testuser,
        };
        resolve(result);
      });
    });

    store.dispatch(checkLogin(testuser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'checkLogin' calls with error`, (done) => {
    const spyError = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(checkLogin(testuser)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'checkLogin' calls with sessionStorage.clear()`, (done) => {
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testuser,
        };
        resolve(result);
      });
    });

    sessionStorage.clear();
    store.dispatch(checkLogin(testuser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should work when 'tryLogout' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(tryLogout(testuser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'tryLogout' calls with errors`, (done) => {
    const spyError = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(tryLogout(testuser)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'trySignup' calls`, (done) => {
    const spy = jest.spyOn(api, 'post').mockImplementation((url, user) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testuser,
        };
        resolve(result);
      });
    });

    store.dispatch(trySignup(testuser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'trySignup' calls with errors`, (done) => {
    const spyError = jest.spyOn(api, 'post').mockImplementation((url, user) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(trySignup(testuser)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'trySignout' calls`, (done) => {
    const spy = jest.spyOn(api, 'post').mockImplementation((url, user) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(trySignout(testuser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'trySignout' calls with error`, (done) => {
    const spyError = jest.spyOn(api, 'post').mockImplementation((url, user) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(trySignout(testuser)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'updateUserInfo' calls`, (done) => {
    const change = { change: 'nickname', email: 'test@email.com', nickname: 'newNick' };
    const edituser = {
      email: 'test@email.com',
      nickname: 'newNick',
      id: 2,
    };
    const spy = jest.spyOn(api, 'put').mockImplementation((url, user) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: edituser,
        };
        resolve(result);
      });
    });

    store.dispatch(updateUserInfo(change)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'updateUserInfo' calls with error`, (done) => {
    const change = { change: 'nickname', nickname: 'newNick' };
    const spyError = jest.spyOn(api, 'put').mockImplementation((url, user) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(updateUserInfo(change)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

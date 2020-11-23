import { api } from '../../api/index';
import groups, { 
    getgrouplist,
    getGroupList,
    postGroup,
    deleteGroup,
    deleteGroupStock,
} from './groups';
import store from '../store';

const testList = [
  { id: 1, name: 'custom group1' },
  { id: 2, name: 'custom group2' },
  { id: 3, name: 'custom group3' },
];

describe('groups', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(groups(undefined, {})).toEqual({
      groupList : [],
    });
  });

  it('should handle getgrouplist', () => {
    expect(
      groups(
        { groupList : [] },
        {
          type: getgrouplist.type,
          payload: testList,
        },
      ),
    ).toEqual({
      groupList : testList,
    });
  });

  it(`should work when 'getGroupList' calls`, (done) => {
    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(getGroupList()).then(() => {
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getGroupList' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getGroupList()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'postGroup' calls`, (done) => {
    const spyApiPost = jest.spyOn(api, 'post').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: {},
        };
        resolve(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(postGroup()).then(() => {
      expect(spyApiPost).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'postGroup' calls with post error`, (done) => {
    const spyApiPost = jest.spyOn(api, 'post').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: {},
        };
        reject(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(postGroup()).then(() => {
      expect(spyApiPost).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should not work when 'postGroup' calls with get error`, (done) => {
    const spyApiPost = jest.spyOn(api, 'post').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {},
        };
        resolve(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
            data: testList,
          };
          reject(result);
        });
      });

    store.dispatch(postGroup()).then(() => {
      expect(spyApiPost).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'deleteGroup' calls`, (done) => {
    const spyApiDelete = jest.spyOn(api, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {},
        };
        resolve(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(deleteGroup()).then(() => {
      expect(spyApiDelete).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'deleteGroup' calls with delete error`, (done) => {
    const spyApiDelete = jest.spyOn(api, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: {},
        };
        reject(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(deleteGroup()).then(() => {
      expect(spyApiDelete).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should not work when 'deleteGroup' calls with get error`, (done) => {
    const spyApiDelete = jest.spyOn(api, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {},
        };
        resolve(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
            data: {},
          };
          reject(result);
        });
      });

    store.dispatch(deleteGroup()).then(() => {
      expect(spyApiDelete).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'deleteGroupStock' calls`, (done) => {
    const spyApiDelete = jest.spyOn(api, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {},
        };
        resolve(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(deleteGroupStock()).then(() => {
      expect(spyApiDelete).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'deleteGroupStock' calls with delete error`, (done) => {
    const spyApiDelete = jest.spyOn(api, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: {},
        };
        reject(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: testList,
          };
          resolve(result);
        });
      });

    store.dispatch(deleteGroupStock()).then(() => {
      expect(spyApiDelete).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(0);
      done();
    });
  });


  it(`should not work when 'deleteGroupStock' calls with get error`, (done) => {
    const spyApiDelete = jest.spyOn(api, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: {},
        };
        resolve(result);
      });
    });

    const spyApiGet = jest.spyOn(api, 'get').mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: testList,
          };
          reject(result);
        });
      });

    store.dispatch(deleteGroupStock()).then(() => {
      expect(spyApiDelete).toHaveBeenCalledTimes(1);
      expect(spyApiGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

});

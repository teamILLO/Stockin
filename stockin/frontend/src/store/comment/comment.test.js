import { api } from '../../api/index';

import comment, {
  saveCommentList,
  editCommentList,
  deleteCommentFromList,
  postCommentToList,
  getComments,
  editComment,
  deleteComment,
  postComment,
} from './comment';
import store from '../store';

const testList = [
  { id: 1, stock: 1, time: 'time1', content: 'content1', author: 'author1' },
  { id: 2, stock: 1, time: 'time2', content: 'content2', author: 'author2' },
  { id: 3, stock: 1, time: 'time3', content: 'content3', author: 'author3' },
  { id: 4, stock: 2, time: 'time4', content: 'content4', author: 'author4' },
  { id: 5, stock: 2, time: 'time5', content: 'content5', author: 'author5' },
];

const testcomment = { id: 1, stock: 1, time: 'time1', content: 'content1', author: 'author1' };

describe('comment ', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should handle initial state', () => {
    expect(comment(undefined, {})).toEqual({
      commentList: [],
    });
  });

  it('should handle saveCommentList', () => {
    expect(
      comment(
        { commentList: [] },
        {
          type: saveCommentList.type,
          payload: testList,
        },
      ),
    ).toEqual({
      commentList: testList,
    });
  });

  it('should handle saveCommentList', () => {
    expect(
      comment(
        { commentList: [] },
        {
          type: saveCommentList.type,
          payload: testList,
        },
      ),
    ).toEqual({
      commentList: testList,
    });
  });

  it('should handle editCommentList', () => {
    const editComment = {
      id: 1,
      stock: 1,
      time: 'time1',
      content: 'edit-content1',
      author: 'author1',
    };

    const editList = [
      { id: 1, stock: 1, time: 'time1', content: 'edit-content1', author: 'author1' },
      { id: 2, stock: 1, time: 'time2', content: 'content2', author: 'author2' },
      { id: 3, stock: 1, time: 'time3', content: 'content3', author: 'author3' },
      { id: 4, stock: 2, time: 'time4', content: 'content4', author: 'author4' },
      { id: 5, stock: 2, time: 'time5', content: 'content5', author: 'author5' },
    ];
    expect(
      comment(
        { commentList: testList },
        {
          type: editCommentList.type,
          payload: editComment,
        },
      ),
    ).toEqual({
      commentList: editList,
    });
  });

  it('should handle deleteCommentFromList', () => {
    const deleteComment = {
      id: 1,
      stock: 1,
      time: 'time1',
      content: 'content1',
      author: 'author1',
    };

    const deletedList = [
      { id: 2, stock: 1, time: 'time2', content: 'content2', author: 'author2' },
      { id: 3, stock: 1, time: 'time3', content: 'content3', author: 'author3' },
      { id: 4, stock: 2, time: 'time4', content: 'content4', author: 'author4' },
      { id: 5, stock: 2, time: 'time5', content: 'content5', author: 'author5' },
    ];

    expect(
      comment(
        { commentList: testList },
        {
          type: deleteCommentFromList.type,
          payload: deleteComment,
        },
      ),
    ).toEqual({
      commentList: deletedList,
    });
  });

  it('should handle deleteCommentFromList', () => {
    const newComment = {
      stock: 1,
      time: 'new-time',
      content: 'new-content',
      author: 'new-author',
    };

    const newList = [
      { id: 1, stock: 1, time: 'time1', content: 'content1', author: 'author1' },
      { id: 2, stock: 1, time: 'time2', content: 'content2', author: 'author2' },
      { id: 3, stock: 1, time: 'time3', content: 'content3', author: 'author3' },
      { id: 4, stock: 2, time: 'time4', content: 'content4', author: 'author4' },
      { id: 5, stock: 2, time: 'time5', content: 'content5', author: 'author5' },
      { stock: 1, time: 'new-time', content: 'new-content', author: 'new-author' },
    ];

    expect(
      comment(
        { commentList: testList },
        {
          type: postCommentToList.type,
          payload: newComment,
        },
      ),
    ).toEqual({
      commentList: newList,
    });
  });

  it(`should work when 'getComments' calls`, (done) => {
    const spy = jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testList,
        };
        resolve(result);
      });
    });

    store.dispatch(getComments(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'getComments' calls with error`, (done) => {
    jest.spyOn(api, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(getComments(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'editComment' calls`, (done) => {
    const spy = jest.spyOn(api, 'put').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: testcomment,
        };
        resolve(result);
      });
    });

    store.dispatch(editComment(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'editComment' calls with error`, (done) => {
    jest.spyOn(api, 'put').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(editComment(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'deleteComment' calls`, (done) => {
    const spy = jest.spyOn(api, 'delete').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 204,
        };
        resolve(result);
      });
    });

    store.dispatch(deleteComment(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'deleteComment' calls with error`, (done) => {
    jest.spyOn(api, 'delete').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(deleteComment(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should work when 'postComment' calls`, (done) => {
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: testcomment,
        };
        resolve(result);
      });
    });

    store.dispatch(postComment(1, 'content', 'author')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should not work when 'postComment' calls with error`, (done) => {
    jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 400,
        };
        reject(result);
      });
    });

    store.dispatch(postComment(1, 'content', 'author')).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

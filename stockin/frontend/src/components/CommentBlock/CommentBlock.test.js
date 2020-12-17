import React from 'react';
import { Provider } from 'react-redux';

import {
  render,
  fireEvent,
  queryAllByTestId,
  screen,
  wait,
  queryAllByText,
} from '@testing-library/react';
import CommentBlock from './CommentBlock';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

import * as comment from '../../store/comment/comment';

const defaultProps = {
  id: 1,
  author: 'TEST_AUTHOR',
  time: '2020-11-09T0336Z',
  content: 'TEST_CONTENT',
};

const wrongProps = {
  author: 'TEST_AUTHOR',
  time: '2020-11-09T0336Z',
  content: 'TEST_CONTENT',
};

const initialCommentState = { commentList: [{ ...defaultProps, stock: 1 }] };

const mockStoreUserNull = getMockStore(
  {},
  { stockList: [] },
  { priceList: [] },
  initialCommentState,
  { news: [] },
  { fs: [] },
);

const mockStoreUserSame = getMockStore(
  { loggedIn: true, user: { id: 1, nickname: 'TEST_AUTHOR' } },
  { stockList: [] },
  { priceList: [] },
  initialCommentState,
  { news: [] },
  { fs: [] },
);

const mockStoreUserDiff = getMockStore(
  { loggedIn: true, user: { id: 1, nickname: 'TEST_ARTHUR' } },
  { stockList: [] },
  { priceList: [] },
  initialCommentState,
  { news: [] },
  { fs: [] },
);

describe('<CommentBlock />', () => {
  let commentBlockUserNull,
    commentBlockUserSame,
    commentBlockUserDiff,
    commentBlockIDExist,
    spyEditComment,
    spyDeleteComment;
  beforeEach(() => {
    commentBlockUserNull = (
      <Provider store={mockStoreUserNull}>
        <CommentBlock history={history} {...defaultProps} />
      </Provider>
    );
    commentBlockUserSame = (
      <Provider store={mockStoreUserSame}>
        <CommentBlock history={history} {...{ ...defaultProps, time: '20201109T1536Z' }} />
      </Provider>
    );
    commentBlockUserDiff = (
      <Provider store={mockStoreUserDiff}>
        <CommentBlock history={history} {...{ ...defaultProps, time: '20201109T0036Z' }} />
      </Provider>
    );
    commentBlockIDExist = (
      <Provider store={mockStoreUserDiff}>
        <CommentBlock
          history={history}
          author_id={1}
          {...{ ...defaultProps, time: '20201109T0036Z' }}
        />
      </Provider>
    );

    spyEditComment = jest.spyOn(comment, 'editComment').mockImplementation(() => {
      return (dispatch) => {};
    });

    spyDeleteComment = jest.spyOn(comment, 'deleteComment').mockImplementation(() => {
      return (dispatch) => {};
    });
  });

  it('should render without errors', () => {
    const { container } = render(commentBlockUserNull);
    const query = queryAllByTestId(container, 'CommentBlock');
    expect(query.length).toBe(1);
  });

  it('should render without errors when author_id is none', () => {
    const { container } = render(commentBlockIDExist);
    const query = queryAllByTestId(container, 'CommentBlock');
    expect(query.length).toBe(1);
  });

  it('should have edit and delete buttons', () => {
    const { container } = render(commentBlockUserSame);
    let query = queryAllByText(container, /edit/i);
    expect(query.length).toBe(1);
    query = queryAllByText(container, /delete/i);
    expect(query.length).toBe(1);
  });

  it('should not have edit and delete buttons', () => {
    const { container } = render(commentBlockUserDiff);
    let query = queryAllByText(container, /edit/i);
    expect(query.length).toBe(0);
    query = queryAllByText(container, /delete/i);
    expect(query.length).toBe(0);
  });

  it('should have submit edit button and be gone when clicked', async () => {
    render(commentBlockUserSame);
    let query;
    await wait(() => {
      query = screen.getByTestId(/editbutton/i);
    });
    await wait(() => {
      fireEvent.click(query);
    });
    await wait(() => {
      query = screen.getByTestId(/submiteditbutton/i);
    });
    fireEvent.click(query);
    query = screen.queryAllByTestId(/submiteditbutton/i);
    expect(query.length).toBe(0);
  });
  it('should change content after edit', async () => {
    render(commentBlockUserSame);
    let query;
    await wait(() => {
      query = screen.getByTestId(/editbutton/i);
    });
    await wait(() => {
      fireEvent.click(query);
    });
    await wait(() => {
      query = screen.getByPlaceholderText(/write your comment here/i);
    });
    fireEvent.change(query, { target: { value: 'TEST_CHANGE' } });
    query = screen.queryAllByText('TEST_CHANGE');
    expect(query.length).toBe(1);
  });
  it('should call deleteComment', async () => {
    render(commentBlockUserSame);
    let query;
    await wait(() => {
      query = screen.getByTestId(/deletebutton/i);
    });
    fireEvent.click(query);
    expect(spyDeleteComment).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { Provider, useSelector } from 'react-redux';

import {
  render,
  fireEvent,
  queryAllByTestId,
  screen,
  queryAllByText,
} from '@testing-library/react';
import CommentBlock from './CommentBlock';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { scaleDivergingPow } from 'd3-scale';

const defaultProps = {
  id: 1,
  author: 'TEST_AUTHOR',
  time: '2020-11-09',
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
  { loggedIn: true, user: { nickname: 'TEST_AUTHOR' } },
  { stockList: [] },
  { priceList: [] },
  initialCommentState,
  { news: [] },
  { fs: [] },
);

const mockStoreUserDiff = getMockStore(
  { loggedIn: true, user: { nickname: 'TEST_ARTHUR' } },
  { stockList: [] },
  { priceList: [] },
  initialCommentState,
  { news: [] },
  { fs: [] },
);

describe('<CommentBlock />', () => {
  let commentBlockUserNull, commentBlockUserSame, commentBlockUserDiff, spyHistoryPush;
  beforeEach(() => {
    commentBlockUserNull = (
      <Provider store={mockStoreUserNull}>
        <CommentBlock history={history} {...defaultProps} />
      </Provider>
    );
    commentBlockUserSame = (
      <Provider store={mockStoreUserSame}>
        <CommentBlock history={history} {...defaultProps} />
      </Provider>
    );
    commentBlockUserDiff = (
      <Provider store={mockStoreUserDiff}>
        <CommentBlock history={history} {...defaultProps} />
      </Provider>
    );
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
  });
  it('should render without errors', () => {
    const { container } = render(commentBlockUserNull);
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
  it('should have submit edit button', () => {
    const { container } = render(commentBlockUserSame);
    let query = queryAllByTestId(container, 'editButton');
    expect(query.length).toBe(1);
    fireEvent.click(getByTestId('editButton'));
    query = queryAllByTestId(container, 'editSubmitButton');
    expect(query.length).toBe(1);
  });
});

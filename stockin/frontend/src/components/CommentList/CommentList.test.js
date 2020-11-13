import React from 'react';
import { Provider } from 'react-redux';

import { render, fireEvent, queryAllByTestId } from '@testing-library/react';
import CommentList from './CommentList';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

const defaultProps = {
  id: 1,
  author: 'TEST_AUTHOR',
  time: '2020-11-09',
  content: 'TEST_CONTENT',
};

const initialCommentState = { commentList: [{ ...defaultProps, stock: 1 }] };

const mockStore = getMockStore(
  {},
  { stockList: [] },
  { priceList: [] },
  initialCommentState,
  { news: [] },
  { fs: [] },
);

describe('<CommentList />', () => {
  let commentList, spyHistoryPush;
  beforeEach(() => {
    commentList = (
      <Provider store={mockStore}>
        <CommentList history={history} {...defaultProps} />
      </Provider>
    );
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
  });
  it('should render without errors', () => {
    const { container } = render(commentList);
    const query = queryAllByTestId(container, 'CommentList');
    expect(query.length).toBe(1);
  });
});

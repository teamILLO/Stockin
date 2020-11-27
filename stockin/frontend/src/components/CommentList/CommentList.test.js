import React from 'react';
import { Provider } from 'react-redux';

import { render, queryAllByTestId } from '@testing-library/react';
import CommentList from './CommentList';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

jest.mock('../CommentBlock/CommentBlock', () => {
  return jest.fn((props) => {
    return <div className="spyCommentBlock">{props.content}</div>;
  });
});

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
  let commentList;
  beforeEach(() => {
    commentList = (
      <Provider store={mockStore}>
        <CommentList history={history} {...defaultProps} />
      </Provider>
    );
    jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
  });
  it('should render without errors', () => {
    const { container } = render(commentList);
    const query = queryAllByTestId(container, 'CommentList');
    expect(query.length).toBe(1);
  });
});

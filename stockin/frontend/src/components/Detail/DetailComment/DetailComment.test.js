import React from 'react';
import { Provider } from 'react-redux';

import { render, fireEvent, screen } from '@testing-library/react';
import DetailComment from './DetailComment';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as comment from '../../../store/comment/comment';

const defaultProps = {
  id: 1,
};

const mockStore = getMockStore(
  { loggedIn: true, user: { nickname: 'TEST_AUTHOR' } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);

describe('<DetailComment />', () => {
  let detailComment, spyPostComment;
  beforeEach(() => {
    detailComment = (
      <Provider store={mockStore}>
        <DetailComment history={history} {...defaultProps} />
      </Provider>
    );
    spyPostComment = jest.spyOn(comment, 'postComment').mockImplementation(() => {
      return (dispatch) => {};
    });
  });
  it('should render without errors', () => {
    render(detailComment);
    const query = screen.queryAllByTestId('DetailComment');
    expect(query.length).toBe(1);
  });
  it('should change content', () => {
    render(detailComment);
    let query = screen.getByPlaceholderText(/write your comment here/i);
    fireEvent.change(query, { target: { value: 'TEST_POST' } });
    query = screen.queryAllByText(/test_post/i);
    expect(query.length).toBe(1);
  });
  it('should call postComment', () => {
    render(detailComment);
    const query = screen.getByText(/submit/i);
    fireEvent.click(query);
    expect(spyPostComment).toHaveBeenCalledTimes(1);
  });
});

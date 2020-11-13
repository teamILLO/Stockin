import React from 'react';
import { render, screen, getByText, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import DetailNews from './DetailNews';

jest.mock('./NewsDatePicker', () => {
  return jest.fn((props) => {
    return <div data-testid="spyNewsDatePicker"></div>;
  });
});

const newsList = [
  { id: 1, title: 'title1', link: 'link1', press: 'press1' },
  { id: 2, title: 'title2', link: 'link2', press: 'press2' },
  { id: 3, title: 'title3', link: 'link3', press: 'press3' },
];

const mockStore = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: newsList },
  { fs: [] },
);

describe('<DetailNews />', () => {
  let detailNews;

  beforeEach(() => {
    detailNews = (
      <Provider store={mockStore}>
        <DetailNews />
      </Provider>
    );
  });
  it('should render without errors', () => {
    const { container } = render(detailNews);
    const query = queryAllByTestId(container, 'DetailNews');
    expect(query.length).toBe(1);
  });
});

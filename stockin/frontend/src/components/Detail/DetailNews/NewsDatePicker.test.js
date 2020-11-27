import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getMockStore } from '../../../test-utils/mocks';
import NewsDatePicker from './NewsDatePicker';
import * as news from '../../../store/news/news';

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

describe('<NewsDatePicker />', () => {
  let newsDatePicker, spyGetNews;
  beforeEach(() => {
    newsDatePicker = (
      <Provider store={mockStore}>
        <NewsDatePicker name="datepicker" />
      </Provider>
    );

    spyGetNews = jest.spyOn(news, 'getNews').mockImplementation((id, data) => {
      return (dispatch) => {};
    });
  });

  it('should render without errors', () => {
    // window.history.assign('/1');
    const { container } = render(newsDatePicker);
    const query = container.querySelectorAll('div[class="react-datepicker-wrapper"]');
    expect(query.length).toBe(1);
    const newDate = Date(Date.now());
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: '12/25/2019' } });
  });
});

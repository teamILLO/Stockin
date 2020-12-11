import React from 'react';
import {
  screen,
  render,
  fireEvent,
  waitForElement,
  queryAllByTestId,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { getMockStore } from '../../../test-utils/mocks';
import NewsDatePicker from './NewsDatePicker';
import * as news from '../../../store/news/news';
import * as datePicker from 'react-datepicker';
import * as datefns from 'date-fns';

jest.mock('react-datepicker');
jest.mock('date-fns');

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
    window.history.pushState({}, '', '/localhost:3000/detail/1/');
    const { container } = render(newsDatePicker);
    // const query = container.querySelectorAll('datepicker');
    const query = queryAllByTestId(container, 'datepicker');
    expect(query.length).toBe(1);
  });
});

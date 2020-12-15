import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import { getMockStore } from '../../../test-utils/mocks';
import MyInterestsDetail from './MyInterestsDetail';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import { useDispatch } from 'react-redux';
import { deleteGroup } from '../../../store/groups/groups';
const mockStore = getMockStore(
  { loggingIn: true, user: { email: 'test@email.com', nickname: 'nickname', id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
  {
    group: [],
    groupList: [
      { id: 2, name: 'custom group2', stocks: [{ id: 1 }] },
      { id: 1, name: 'custom group1', stocks: [{ id: 1 }] },
    ],
  },
);
const mockStore2 = getMockStore({ group: [], groupList: [] });
describe('<MyInterestsDetail />', () => {
  let myInterestsDetail, myInterestsDetail2, spyGet;
  beforeEach(() => {
    myInterestsDetail = (
      <Provider store={mockStore}>
        <MyInterestsDetail />
      </Provider>
    );
    myInterestsDetail2 = (
      <Provider store={mockStore2}>
        <MyInterestsDetail />
      </Provider>
    );

    spyGet = jest.spyOn(api, 'get').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        let result;
        result = {
          status: 200,
          data: [
            { id: 1, name: 'custom group1' },
            { id: 2, name: 'custom group2' },
          ],
        };
        resolve(result);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    render(myInterestsDetail);
    const g1 = screen.getByText('custom group1');
    const g2 = screen.getByText('custom group2');
    fireEvent.click(g1);
    fireEvent.click(g2);
    fireEvent.click(g2);
    fireEvent.click(screen.getByText('edit group'));
  });

  it('should render without errors', () => {
    render(myInterestsDetail2);
  });

  it('should render without errors', async () => {
    const sleep = (seconds) => new Promise((res) => setTimeout(() => res(), seconds * 1000));

    render(myInterestsDetail);
    sleep(2);
  });
});

import React from 'react';
import { render, screen, fireEvent, queryByTestId, queryAllByTestId } from '@testing-library/react';
import MyInterests from './MyInterests';
import { Provider } from 'react-redux';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import * as groups from '../../../store/groups/groups';

const mockStore = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
  {
    groupList: [
      { id: 1, name: 'group1', stocks: [{ title: 'stock1', fs_score: {}, score: 1 }] },
      { id: 2, name: 'group2', stocks: [{ title: 'stock1', fs_score: { score: 1 }, score: 1 }] },
    ],
  },
);

const mockStoreNoGroup = getMockStore(
  { loggingIn: true, user: { id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
  { groupList: [] },
);

jest.mock('./MyInterestsChart', () => {
  return jest.fn((props) => {
    return <div data-testid="spyMyInterestsChart"></div>;
  });
});

jest.mock('../../Modal/EditModal/EditModal', () => {
  return jest.fn((props) => {
    return <div data-testid="spyEditModal"></div>;
  });
});

describe('<MyInterests />', () => {
  let myInterest, myInterestNoGroup, spyGetGroupList;

  beforeEach(() => {
    myInterest = (
      <Provider store={mockStore}>
        <MyInterests history={history} />
      </Provider>
    );
    myInterestNoGroup = (
      <Provider store={mockStoreNoGroup}>
        <MyInterests history={history} />
      </Provider>
    );

    spyGetGroupList = jest.spyOn(groups, 'getGroupList').mockImplementation((id, data) => {
      return (dispatch) => {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = render(myInterest);
    const query = queryAllByTestId(container, 'MyInterests');
    expect(query.length).toBe(1);
  });

  test(`should handle groub tab`, () => {
    const { container } = render(myInterest);
    fireEvent.click(screen.getByText(/group2/i));
    const query = queryAllByTestId(container, 'MyInterests');
    expect(query.length).toBe(1);
  });

  test(`should handle last tab`, () => {
    const { container } = render(myInterest);
    fireEvent.click(queryByTestId(container, 'spyEditModal'));
    const query = queryAllByTestId(container, 'MyInterests');
    expect(query.length).toBe(1);
  });

  test(`should render when group does not exist`, () => {
    const { container } = render(myInterestNoGroup);
    const query = queryAllByTestId(container, 'MyInterests');
    expect(query.length).toBe(1);
  });
});

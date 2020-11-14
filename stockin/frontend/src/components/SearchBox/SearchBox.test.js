import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import SearchBox from './SearchBox';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';
import { api } from '../../api/index';

// const localStorageMock = {
//   getItem: jest.fn(a=>{
//     return ['{ "id": 1, "title" : "foo1_title", "code" : "foo1_code", "sector" : "foo1_sector"}']
//   }),
//   setItem: jest.fn(),
//   clear: jest.fn()
// };

// global.localStorage =  localStorageMock;

const initialAuthState = {};

const initialStockState = {
  stockList: [
    { id: 1, title: 'foo1_title', code: 'foo1_code', sector: 'foo1_sector' },
    { id: 2, title: 'foo2_title', code: 'foo2_code', sector: 'foo2_sector' },
  ],
};

const stubStock = [
  { id: 1, title: 'foo1_title', code: 'foo1_code', sector: 'foo1_sector' },
  { id: 2, title: 'foo2_title', code: 'foo2_code', sector: 'foo2_sector' },
];

const mockStore = getMockStore(initialAuthState, initialStockState);

describe('<SearchBox />', () => {
  let searchbox;

  beforeEach(() => {
    searchbox = (
      <Provider store={mockStore}>
        <SearchBox history={history} />
      </Provider>
    );

    jest.spyOn(history, 'push').mockImplementation((text) => true);

    jest.spyOn(api, 'get').mockImplementation(() => {
      const response = {
        status: 200,
        data: stubStock,
      };
      return Promise.resolve(response);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it should unmount', async () => {
    const { unmount } = render(searchbox);

    unmount();
  });

  it('it should render without errors', async () => {
    const { getByText } = render(searchbox);
    const query = document.body.querySelector('.prompt');

    fireEvent.change(query, { target: { value: 'foo1_title' } });

    await jest.useFakeTimers();

    fireEvent.change(query, { target: { value: '' } });
    waitForElement(() => getByText(''));
    await jest.runAllTimers();

    fireEvent.change(query, { target: { value: 'foo1_title' } });

    await jest.useFakeTimers();
    setTimeout(() => {
      fireEvent.keyDown(query, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(query, { key: 'Enter', code: 'Enter' });
    }, 3000);
    await jest.runAllTimers();

    fireEvent.change(query, { target: { value: 'foo2_title' } });

    await jest.useFakeTimers();
    setTimeout(() => {
      fireEvent.keyDown(query, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(query, { key: 'Enter', code: 'Enter' });
    }, 3000);
    await jest.runAllTimers();
  });
});

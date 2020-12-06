import React from 'react';
import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import AddStockModal from './AddStockModal';
import { history } from '../../../store/store';
import { Provider } from 'react-redux';
import { getMockStore } from '../../../test-utils/mocks';
import { api } from '../../../api/index';

const stubStock = [
  { id: 1, title: 'foo1_title', code: 'foo1_code', sector: 'foo1_sector' },
  { id: 2, title: 'foo2_title', code: 'foo2_code', sector: 'foo2_sector' },
];

const mockStore = getMockStore(
    { loggingIn: true, user: { email: 'test@email.com', nickname: 'nickname', id: 1 } },
    { stockList: [
        { id: 1, title: 'foo1_title', code: 'foo1_code', sector: 'foo1_sector' },
        { id: 2, title: 'foo2_title', code: 'foo2_code', sector: 'foo2_sector' }]
    },
    { priceList: [] },
    { commentList: [] },
    { news: [] },
    { fs: [] },
    { group : [], groupList : [
        { 'id' : 1,
          'name' : 'custom group1',
          'stocks' : [{'id' : 1, 'title' : 'foo3_title'}, {'id' : 3, 'title' : 'foo3_title'}]},
        { 'id' : 2,
          'name' : 'custom group2',
          'stocks' : [{'id' : 1, 'title' : 'foo1_title'}, {'id' : 2, 'title' : 'foo2_title'}]},
      ]  },
  );

describe('<AddStockModal />', () => {
  let addStockModal;

  beforeEach(() => {
    addStockModal = (
      <Provider store={mockStore}>
        <AddStockModal trigger={<button>trigger</button>} group_id={1} history={history} />
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

  it('it should render', async () => {
    render(addStockModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/종목 추가/i);
    expect(query.length).toBe(1);
  });

  it('it should render cancel button', async () => {
    render(addStockModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/종목 추가/i);
    expect(query.length).toBe(1);
    fireEvent.click(screen.getByText(/취소/i, { selector: 'button' }));
  });

  it('it should handle search box correctly', async () => {
    const { getByText } = render(addStockModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
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

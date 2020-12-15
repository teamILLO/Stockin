import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddFavoriteModal from './AddFavoriteModal';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import { getMockStore } from '../../../test-utils/mocks';

jest.mock('../EditModal/MakeNewGroupModal', () => {
  return jest.fn((props) => {
    return <div data-testid="spyMakeNewGroupModal"></div>;
  });
});

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
      { id: 2, name: 'custom group2' },
      { id: 1, name: 'custom group1' },
    ],
  },
);

describe('<AddFavoriteModal />', () => {
  let addFavoriteModal, spyGet;

  beforeEach(() => {
    addFavoriteModal = (
      <Provider store={mockStore}>
        <AddFavoriteModal trigger={<button>trigger</button>} />
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
    render(addFavoriteModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/그룹 선택/i);
    expect(query.length).toBe(1);
  });

  it('should change state when clicked checkbox', () => {
    const { container } = render(addFavoriteModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/custom group1/i, { selector: 'label' });
    expect(query.length).toBe(1);
    const input = screen.getAllByTestId('checkbox');
    fireEvent.click(input[1].querySelector('input[value="1"]'));
  });

  it('should render confirm button', () => {
    window.history.pushState({}, '', '/localhost:3000/detail/1/');

    const { container } = render(addFavoriteModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/custom group1/i, { selector: 'label' });
    expect(query.length).toBe(1);
    const input = screen.getAllByTestId('checkbox');
    fireEvent.click(input[1].querySelector('input[value="1"]'));
    fireEvent.click(screen.getByText(/확인/i, { selector: 'button' }));
  });

  it('should render cancel button', () => {
    render(addFavoriteModal);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    fireEvent.click(screen.getByText(/취소/i, { selector: 'button' }));
  });
});

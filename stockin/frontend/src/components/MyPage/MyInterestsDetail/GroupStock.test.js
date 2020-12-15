import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import GroupStock from './GroupStock';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import store from '../../../store/store';

describe('<GroupStock />', () => {
  let spyGet;
  beforeEach(() => {
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
    const test_stocks = [
      {
        id: 1,
        title: 'test_title',
        price: 'test_price',
        highestPrice: 'test_highestPrice',
        lowestPrice: 'test_lowestPrice',
        tradeVolume: 'test_tradeVolume',
        tradeValue: 'test_tradeValue',
        startPrice: 'test_startPrice',
        yesterdayPrice: 'test_yesterdayPrice',
        amount: 'test_amount',
        isKOSPI: 'test_isKOSPI',
      },
    ];
    const groupStock = (
      <Provider store={store}>
        <GroupStock stocks={test_stocks} />
      </Provider>
    );

    render(groupStock);
  });

  it('should render without errors with null value props', () => {
    const test_stocks = [
      {
        id: 1,
        title: 'test_title',
        price: null,
        highestPrice: null,
        lowestPrice: null,
        tradeVolume: null,
        tradeValue: null,
        startPrice: null,
        yesterdayPrice: null,
        amount: null,
        isKOSPI: false,
      },
    ];
    const groupStock = (
      <Provider store={store}>
        <GroupStock stocks={test_stocks} />
      </Provider>
    );

    render(groupStock);
  });

  it('should sort by table header', () => {
    const test_stocks = [
      {
        id: 1,
        title: 'test_title',
        price: 'test_price',
        highestPrice: 'test_highestPrice',
        lowestPrice: 'test_lowestPrice',
        tradeVolume: 'test_tradeVolume',
        tradeValue: 'test_tradeValue',
        startPrice: 'test_startPrice',
        yesterdayPrice: 'test_yesterdayPrice',
        amount: 'test_amount',
        isKOSPI: 'test_isKOSPI',
      },
    ];
    const groupStock = (
      <Provider store={store}>
        <GroupStock stocks={test_stocks} />
      </Provider>
    );

    const { container } = render(groupStock);
    fireEvent.click(getByTestId(container, 'title'));
    fireEvent.click(getByTestId(container, 'title'));
    fireEvent.click(getByTestId(container, 'price'));
    fireEvent.click(getByTestId(container, 'highestPrice'));
    fireEvent.click(getByTestId(container, 'lowestPrice'));
    fireEvent.click(getByTestId(container, 'tradeVolume'));
    fireEvent.click(getByTestId(container, 'tradeValue'));
    fireEvent.click(screen.getByText('test_title'));
  });
});

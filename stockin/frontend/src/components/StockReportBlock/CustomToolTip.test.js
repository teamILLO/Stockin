import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CustomToolTip from './CustomToolTip';

const stubPayload = [
    { payload : { id : 1, date : '12-02', endPrice : 1, tradeVolume : 1 }}
]

const stubPayload_excluded = [
    { payload : { id : 2, date : '12-02', endPrice : null, tradeVolume : null }}
]

const mockActiveCustomToolTip = 
  <Provider store={store}>
    <CustomToolTip
      active={true}
      isUp={true}
      payload={stubPayload}
    />
  </Provider>

const mockActiveCustomToolTip_excluded = 
  <Provider store={store}>
    <CustomToolTip
      active={true}
      isUp={true}
      payload={stubPayload_excluded}
    />
  </Provider>

const mockNonActiveCustomToolTip = 
  <Provider store={store}>
    <CustomToolTip
      active={false}
      isUp={false}
      payload={stubPayload}
    />
  </Provider>


describe('<CustomToolTip />', () => {  
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockClear();
  });

  it('should render without errors in active tooltip', () => {
    const { container } = render(mockActiveCustomToolTip);
    const query = queryAllByTestId(container, 'CustomToolTip');
    expect(query.length).toBe(1);
  });

  it('should render without errors in active tooltip with excluded', () => {
    const { container } = render(mockActiveCustomToolTip_excluded);
    const query = queryAllByTestId(container, 'CustomToolTip');
    expect(query.length).toBe(1);
  });

  it('should render without errors in non-active tooltip', () => {
    const { container } = render(mockNonActiveCustomToolTip);
    const query = queryAllByTestId(container, 'CustomToolTip');
    expect(query.length).toBe(1);
  });
});

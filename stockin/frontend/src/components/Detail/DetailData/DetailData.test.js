import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import DetailData from './DetailData';

describe('<DetailData />', () => {
  let detailData;
  let list = [];

  beforeAll(() => {
    let d = new Date(2020, 1, 1);
    for (let i = 0; i < 200; i = i + 1) {
      list.push({
        date: new Date(d.setDate(d.getDate() + i)),
        open: 2000 + i,
        high: 2500 + 2 * i,
        low: 1500 - 2 * i,
        close: 1800 - i,
      });
    }
  });

  beforeEach(() => {
    detailData = <DetailData data={list} />;
  });
  it('should render without errors', () => {
    render(detailData);
    const query = screen.queryAllByTestId('DetailData');
    expect(query.length).toBe(1);
  });
  it('should click interest button', () => {
    render(detailData);
    const query = screen.getByTestId('detailInterest');
    fireEvent.click(query);
  });
});

import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import DetailPriceTrends from './DetailPriceTrends';

describe('<DetailPriceTrends />', () => {
  it('should render without errors', () => {
    const { container } = render(
      <DetailPriceTrends
        data={[
          { date: new Date('Aug 4, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 3, 2019'), close: 0 },
          { date: new Date('Aug 6, 2019'), close: 0 },
        ]}
      />,
    );
    const query = queryAllByTestId(container, 'DetailPriceTrends');
    expect(query.length).toBe(1);
  });

  it('should render without errors v2', () => {
    const { container } = render(
      <DetailPriceTrends
        data={[
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 3, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
          { date: new Date(Date.now()), close: 2500 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date(Date.now()), close: 2300 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 0 },
          { date: new Date('Aug 12, 2019'), close: 2000 },
        ]}
      />,
    );
    const query = queryAllByTestId(container, 'DetailPriceTrends');
    expect(query.length).toBe(1);
  });
});

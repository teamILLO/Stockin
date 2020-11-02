import React from 'react';
import { render, fireEvent, getByTestId, queryAllByTestId } from '@testing-library/react';
import DetailData from './DetailData';

describe('<DetailData />', () => {
  it('should render without errors', () => {
    const { container } = render(<DetailData />);
    const query = queryAllByTestId(container, 'DetailData');
    expect(query.length).toBe(1);
  });

  it('should click on detailInterest button', () => {
    const { container } = render(<DetailData />);
    const button = getByTestId(container, 'detailInterest');
    fireEvent.click(button);
  });
});

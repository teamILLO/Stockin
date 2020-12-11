import React from 'react';
import { render, queryAllByTestId } from '@testing-library/react';
import MyInterestsChart from './MyInterestsChart';
import * as something from 'react-chartjs-2';

jest.mock('react-chartjs-2');

describe('<MyInterestsChart />', () => {
  it('should render without errors', () => {
    const { container } = render(<MyInterestsChart data={[]} />);
    const query = queryAllByTestId(container, 'MyInterestsChart');
    expect(query.length).toBe(1);
  });
});

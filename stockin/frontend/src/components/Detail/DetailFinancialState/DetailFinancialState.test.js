import React from 'react';
import { render, screen, getByText, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import DetailFinancialState from './DetailFinancialState';
import YearTable from './YearTable';
import QuarterTable from './QuarterTable';

jest.mock('./QuarterTable', () => {
  return jest.fn((props) => {
    return <div data-testid="spyQuarterTable"></div>;
  });
});

describe('<DetailFinancialState />', () => {
  let detailFinancialState;

  beforeEach(() => {
    detailFinancialState = (
      <Provider store={getMockStore()}>
        <DetailFinancialState />
      </Provider>
    );
  });
  it('should render without errors', () => {
    const { container } = render(detailFinancialState);
    const query = queryAllByTestId(container, 'DetailFinancialState');
    expect(query.length).toBe(1);
  });

  test(`should change tab when clicked 'Preview'`, () => {
    const { container } = render(detailFinancialState);
    fireEvent.click(screen.getByText('분기'));
    const query = queryAllByTestId(container, 'spyQuarterTable');
    expect(query.length).toBe(1);
  });
});

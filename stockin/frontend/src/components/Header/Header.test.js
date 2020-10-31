import React from 'react';
import { render, fireEvent, getByTestId, queryAllByTestId } from '@testing-library/react';
import Header from './Header';
import { history } from '../../store/store';

describe('<Header />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without errors', () => {
    const { container } = render(<Header />);
    const query = queryAllByTestId(container, 'Header');
    expect(query.length).toBe(1);
  });

  it('should call onClickNavHandler when clicking Logo', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'Logo');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking REPORT', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'Report');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking MY PAGE', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'Mypage');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking ABOUT US', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'AboutUs');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking Logo in StickyHeader', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'stickyLogo');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking REPORT in StickyHeader', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'stickyReport');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking MY PAGE in StickyHeader', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Header history={history} />);
    const button = getByTestId(container, 'stickyMypage');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});

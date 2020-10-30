import React from 'react';
import { render, fireEvent, getByTestId, queryAllByTestId } from '@testing-library/react';
import Footer from './Footer';
import { history } from '../../store/store';

describe('<Footer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = render(<Footer />);
    const query = queryAllByTestId(container, 'Footer');
    expect(query.length).toBe(1);
  });

  it('should call onClickNavHandler when clicking HOME', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Footer history={history} />);
    const button = getByTestId(container, 'HOME');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking REPORT', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Footer history={history} />);
    const button = getByTestId(container, 'REPORT');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking MYPAGE', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Footer history={history} />);
    const button = getByTestId(container, 'MYPAGE');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking ABOUT US', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Footer history={history} />);
    const image = getByTestId(container, 'ABOUT US');
    fireEvent.click(image);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should call onClickNavHandler when clicking Logo', () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => true);
    const { container } = render(<Footer history={history} />);
    const button = getByTestId(container, 'Logo');
    fireEvent.click(button);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});

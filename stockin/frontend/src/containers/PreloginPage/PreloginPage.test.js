import React from 'react';
import {
  render,
  screen,
  fireEvent,
  queryAllByTestId,
  getByPlaceholderText,
} from '@testing-library/react';
import PreloginPage from './PreloginPage';

describe('<PreloginPage />', () => {
  it('should render without errors', () => {
    const { container } = render(<PreloginPage />);
    const query = queryAllByTestId(container, 'PreloginPage');
    expect(query.length).toBe(1);
  });

  test(`should change tab when clicked 'About Stockin'`, () => {
    const { container } = render(<PreloginPage />);
    fireEvent.click(screen.getByText(/about stockin/i));
    const query = queryAllByTestId(container, 'Stockin');
    expect(query.length).toBe(1);
  });

  test(`should change tab when clicked 'About Us'`, () => {
    const { container } = render(<PreloginPage />);
    fireEvent.click(screen.getByText(/about us/i));
    const query = queryAllByTestId(container, 'AboutUs');
    expect(query.length).toBe(1);
  });

  test(`should change tab when clicked 'Preview'`, () => {
    const { container } = render(<PreloginPage />);
    fireEvent.click(screen.getByText(/preview/i));
    const query = queryAllByTestId(container, 'Preview');
    expect(query.length).toBe(1);
  });

  test(`should change value in email input field`, () => {
    const { container } = render(<PreloginPage />);
    const query = getByPlaceholderText(container, 'Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    expect(query.value).toBe('test@email.com');
  });

  test(`should change value in password input field`, () => {
    const { container } = render(<PreloginPage />);
    const query = getByPlaceholderText(container, 'Password');
    fireEvent.change(query, { target: { value: 'password' } });
    expect(query.value).toBe('password');
  });
});

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  queryAllByTestId,
  getByPlaceholderText,
} from '@testing-library/react';
import SignupModal from './SignupModal';
import store from '../../../store/store';
import { Provider } from 'react-redux';

describe('<SignupModal />', () => {
  let signup;
  beforeEach(() => {
    signup = (
      <Provider store={store}>
        <SignupModal trigger={<button>trigger</button>} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/welcome to stockin!/i);
    expect(query.length).toBe(1);
  });

  it('should close', () => {
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    fireEvent.click(document.body.querySelector('.icon.close'));
    const query = screen.queryAllByText(/welcome to stockin!/i);
    expect(query.length).toBe(0);
  });

  test(`should change value in email input field`, () => {
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    expect(query.value).toBe('test@email.com');
  });

  test(`should change value in password input field`, () => {
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Password');
    fireEvent.change(query, { target: { value: 'password' } });
    expect(query.value).toBe('password');
  });

  test(`should change value in nickname input field`, () => {
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Nickname');
    fireEvent.change(query, { target: { value: 'nickname' } });
    expect(query.value).toBe('nickname');
  });

  test(`should dispatch trySignup`, () => {
    window.alert = () => {};
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    const nickname = screen.getByPlaceholderText('Nickname');
    fireEvent.change(nickname, { target: { value: 'nickname' } });
    fireEvent.click(screen.getByText(/sign up/i, { selector: 'button' }));
    //TODO : check dispatch
  });
});

import React from 'react';
import { render, screen, fireEvent, wait} from '@testing-library/react';
import SignupModal from './SignupModal';
import store from '../../../store/store';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import '../../../styles/buttons.css';

describe('<SignupModal />', () => {
  let signup, spyPost;
  beforeEach(() => {
    signup = (
      <Provider store={store}>
        <SignupModal trigger={<button>trigger</button>} />
      </Provider>
    );

    spyPost = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
          let result
          if(url === '/users/duplicate/')
              result = {
                  status: 200,
                  data: {'duplicate': false},
              };
          else
              result = {
                  status: 200,
              }
          resolve(result);
      });
    });

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
    fireEvent.click(screen.getAllByText(/trigger/i, { selector: 'button' })[0]);
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

  test(`should change value in nickname input field`, async () => {
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'password' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/Next/i, { selector: 'button' }))
    );
    const query = screen.getByPlaceholderText('Nickname');
    fireEvent.change(query, { target: { value: 'nickname' } });
    expect(query.value).toBe('nickname');
  });

  test(`should show alert when duplicated email`, async () => {
    window.alert =jest.fn();
    spyPost = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
          let result
          if(url === '/users/duplicate/')
              result = {
                  status: 200,
                  data: {'duplicate': true},
              };
          else
              result = {
                  status: 200,
              }
          resolve(result);
      });
    });
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'password' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/Next/i, { selector: 'button' }))
    );
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    expect(query.value).toBe('test@email.com');
  });

  test(`should show alert when duplicated nickname`, async () => {
    window.alert =jest.fn();
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'password' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))
    );

    spyPost = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
          let result
          if(url === '/users/duplicate/')
              result = {
                  status: 200,
                  data: {'duplicate': true},
              };
          else
              result = {
                  status: 200,
              }
          resolve(result);
      });
    });
    
    const nickname = screen.getByPlaceholderText('Nickname');
    fireEvent.change(nickname, { target: { value: 'nickname' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/sign up/i, { selector: 'button' }))
    );
    const query = screen.getByPlaceholderText('Nickname');
    fireEvent.change(query, { target: { value: 'nickname' } });
    expect(query.value).toBe('nickname');
  });

  test(`should dispatch trySignup`, async () => {
    window.alert = () => {};
    render(signup);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@email.com' } });
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'password' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/Next/i, { selector: 'button' }))
    );
    const nickname = screen.getByPlaceholderText('Nickname');
    fireEvent.change(nickname, { target: { value: 'nickname' } });
    fireEvent.click(screen.getByText(/sign up/i, { selector: 'button' }));
    //TODO : check dispatch
  });
});

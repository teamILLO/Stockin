import React from 'react';
import {
  render,
  screen,
  fireEvent,
  queryAllByTestId,
  getByPlaceholderText,
} from '@testing-library/react';
import FindPasswdModal from './FindPasswdModal';
import store from '../../../store/store';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';

describe('<SignupModal />', () => {
  let find;
  beforeEach(() => {
    find = (
      <Provider store={store}>
        <FindPasswdModal trigger={<button>trigger</button>} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.queryAllByText(/Find your password!/i);
    expect(query.length).toBe(1);
  });

  it('should close', () => {
    render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    fireEvent.click(document.body.querySelector('.icon.close'));
    const query = screen.queryAllByText(/Find your password!/i);
    expect(query.length).toBe(0);
  });

  test(`should change value in email input field`, () => {
    render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    expect(query.value).toBe('test@email.com');
  });

  test(`should checking email fail`, () => {
    render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {'duplicate': false},
          };
          resolve(result);
        });
    });

    window.alert =jest.fn();
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    expect(spy).toHaveBeenCalledTimes(1);

  });

  test(`should checking email success`, () => {
    render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
        return new Promise((resolve, reject) => {
            let result
            if(url =='/users/duplicate/')
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

    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    expect(spy).toHaveBeenCalledTimes(1);   
  });

  test(`should checking email success`, () => {
    const { rerender } = render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    window.alert =jest.fn();
    const spy = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
        return new Promise((resolve, reject) => {
            let result
            if(url =='/users/duplicate/')
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

    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
  
    
    fireEvent.click(screen.getByText(/next!/i, { selector: 'button' }));
    
    const query1 = screen.queryAllByText(/Please enter your email/i);
    expect(query1.length).toBe(1);
    

  });

//   test(`should change value in nickname input field`, () => {
//     render(signup);
//     fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
//     const email = screen.getByPlaceholderText('Email');
//     fireEvent.change(email, { target: { value: 'test@email.com' } });
//     const password = screen.getByPlaceholderText('Password');
//     fireEvent.change(password, { target: { value: 'password' } });
//     fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
//     const query = screen.getByPlaceholderText('Nickname');
//     fireEvent.change(query, { target: { value: 'nickname' } });
//     expect(query.value).toBe('nickname');
//   });

//   test(`should dispatch trySignup`, () => {
//     window.alert = () => {};
//     render(signup);
//     fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
//     const email = screen.getByPlaceholderText('Email');
//     fireEvent.change(email, { target: { value: 'test@email.com' } });
//     const password = screen.getByPlaceholderText('Password');
//     fireEvent.change(password, { target: { value: 'password' } });
//     fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
//     const nickname = screen.getByPlaceholderText('Nickname');
//     fireEvent.change(nickname, { target: { value: 'nickname' } });
//     fireEvent.click(screen.getByText(/sign up/i, { selector: 'button' }));
//     //TODO : check dispatch
//   });
});

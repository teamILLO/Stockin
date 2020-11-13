import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  wait,
  queryAllByTestId,
  getByPlaceholderText,
} from '@testing-library/react';
import FindPasswdModal from './FindPasswdModal';
import store from '../../../store/store';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';

describe('<SignupModal />', () => {
  let find, spyPost, spyPut;
  beforeEach(() => {
    find = (
      <Provider store={store}>
        <FindPasswdModal trigger={<button>trigger</button>} />
      </Provider>
    );

    spyPost = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
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

    spyPut = jest.spyOn(api, 'put').mockImplementation((url, atc) => null);

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
    spyPost = jest.spyOn(api, 'post').mockImplementation((url, atc) => {
        return new Promise((resolve, reject) => {
            let result
            if(url =='/users/duplicate/')
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
    window.alert =jest.fn();
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    expect(spyPost).toHaveBeenCalledTimes(1);

  });

  test(`should checking email success`, () => {
    render(find);
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    expect(spyPost).toHaveBeenCalledTimes(1);   
  });

  test(`should code checking`, async () => {
    jest.spyOn(Math, 'floor').mockImplementation((num)=>1);
    render(find);
    
    fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
    const query = screen.getByPlaceholderText('Email');
    fireEvent.change(query, { target: { value: 'test@email.com' } });
    window.alert =jest.fn();
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }));
    
    await wait(() => {
        screen.getByText(/next!/i, { selector: 'button' })
    })
    fireEvent.click(screen.getByText(/next!/i, { selector: 'button' }));
   
    const code = screen.getByPlaceholderText('CODE');
    fireEvent.change(code, { target: { value: '111111' } });
    fireEvent.click(screen.getByText(/next!/i, { selector: 'button' }));

    await wait(() => {
        screen.getByText(/Confirm/i, { selector: 'button' })
    })

    const password = screen.getByPlaceholderText('New Password');
    fireEvent.change(password, { target: { value: '1' } });
    fireEvent.click(screen.getByText(/Confirm/i, { selector: 'button' }));
    expect(window.alert).toHaveBeenCalledTimes(2)
   

  });

});

import React from 'react';
import { render, screen, fireEvent, queryAllByTestId, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import * as authentication from '../../../store/authentication/authentication';
import { api } from '../../../api/index';
import MyInfo from './MyInfo';


const mockStore = getMockStore(
  { loggingIn: true, user: { email: 'test@email.com', nickname: 'nickname', id: 1 } },
  { stockList: [] },
  { priceList: [] },
  { commentList: [] },
  { news: [] },
  { fs: [] },
);
window.alert = jest.fn();

describe('<MyInfo />', () => {
  let myInfo, spyUpdateUserInfo, spyPost;

  beforeEach(() => {
    myInfo = (
      <Provider store={mockStore}>
        <MyInfo history={history} />
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

    spyUpdateUserInfo = jest
      .spyOn(authentication, 'updateUserInfo')
      .mockImplementation((change) => {
        return (dispatch) => {};
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = render(myInfo);
    const query = queryAllByTestId(container, 'MyInfo');
    expect(query.length).toBe(1);
  });

  it('should call clickEdit when edit button clicked', () => {
    const { container } = render(myInfo);
    fireEvent.click(screen.getByText(/edit!/i, { selector: 'button' }));
    const query = queryAllByTestId(container, 'MyInfoEdit');
    expect(query.length).toBe(1);
  });

  it('should change value when confirm clicked', async () => {
    const { container } = render(myInfo);
    fireEvent.click(screen.getByText(/edit!/i, { selector: 'button' }));
    let input = container.querySelector('input[name="nicknameInput"]');
    fireEvent.change(input, { target: { value: 'newNickname' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/confirm!/i, { selector: 'button' }))
    );
    expect(spyUpdateUserInfo).toHaveBeenCalledTimes(1);
  });

  it('should not change value when nickname duplicated', async () => {
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

    const { container } = render(myInfo);
    fireEvent.click(screen.getByText(/edit!/i, { selector: 'button' }));
    let input = container.querySelector('input[name="nicknameInput"]');
    fireEvent.change(input, { target: { value: 'newNickname' } });
    await wait(() =>
      fireEvent.click(screen.getByText(/confirm!/i, { selector: 'button' }))
    );
    expect(spyUpdateUserInfo).toHaveBeenCalledTimes(0);
  });

  it('should not change value when cancel clicked', () => {
    const { container } = render(myInfo);
    fireEvent.click(screen.getByText(/edit!/i, { selector: 'button' }));
    let input = container.querySelector('input[name="nicknameInput"]');
    fireEvent.change(input, { target: { value: 'newNickname' } });
    fireEvent.click(screen.getByText(/cancel!/i, { selector: 'button' }));
    const query = screen.queryAllByText(/newnickname/i);
    expect(query.length).toBe(0);
  });

  it('should not change value when no change', () => {
    render(myInfo);
    fireEvent.click(screen.getByText(/edit!/i, { selector: 'button' }));
    fireEvent.click(screen.getByText(/confirm!/i, { selector: 'button' }));
    const query = screen.queryAllByText(/newnickname/i);
    expect(query.length).toBe(0);
  });

  it('should sign out', () => {
    window.confirm = jest.fn(() => true)
    render(myInfo);
    fireEvent.click(screen.getByText(/SIGNOUT/i, { selector: 'button' }));
    const query = screen.queryAllByText(/newnickname/i);
    expect(query.length).toBe(0);
  });

  it('should not sign out', () => {
    window.confirm = jest.fn(() => false)
    render(myInfo);
    fireEvent.click(screen.getByText(/SIGNOUT/i, { selector: 'button' }));
    const query = screen.queryAllByText(/newnickname/i);
    expect(query.length).toBe(0);
  });
});

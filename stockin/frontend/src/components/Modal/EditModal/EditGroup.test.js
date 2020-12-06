import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import EditGroup from './EditGroup';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';


const mockStore = getMockStore(
    { loggingIn: true, user: { email: 'test@email.com', nickname: 'nickname', id: 1 } },
    { stockList: [] },
    { priceList: [] },
    { commentList: [] },
    { news: [] },
    { fs: [] },
    { group : [], groupList : [{ 'id' : 2, 'name' : 'custom group2'}, { 'id' : 1, 'name' : 'custom group1'},] },
  );

describe('<EditGroup />', () => {
    let editGroup, spyDelete, spyGet;
    beforeEach(() => {
      editGroup = (
        <Provider store={mockStore}>
          <EditGroup history={history}/>
        </Provider>
      );
  
      spyDelete = jest.spyOn(api, 'delete').mockImplementation((url, atc) => {
          return new Promise((resolve, reject) => {
                let result;
                result = {
                    status: 200,
                };
                resolve(result);
          });
      });

      spyGet = jest.spyOn(api, 'get').mockImplementation((url, atc) => {
        return new Promise((resolve, reject) => {
              let result;
              result = {
                  status: 200,
                  data : [
                    { 'id' : 1, 'name' : 'custom group1'},
                    { 'id' : 2, 'name' : 'custom group2'},
                  ]
              };
              resolve(result);
        });
      });

    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render without errors', () => {
        render(editGroup);
        const query = screen.queryAllByText(/삭제/i, { selector: 'button' });
        expect(query.length).toBe(1);
    });

    it('should change state when clicked checkbox', () => {
        const { container } = render(editGroup);
        const query = screen.queryAllByText(/custom group1/i, { selector: 'label' });
        expect(query.length).toBe(1);
        let input = container.querySelector('input[value="1"]');
        fireEvent.click(input);
    });

    it('should delete when clicked delete button', () => {
        const { container } = render(editGroup);
        const query = screen.queryAllByText(/custom group1/i, { selector: 'label' });
        expect(query.length).toBe(1);
        fireEvent.click(container.querySelector('input[value="1"]'));
        fireEvent.click(screen.getByText(/삭제/i, { selector: 'button' }));
    });
});
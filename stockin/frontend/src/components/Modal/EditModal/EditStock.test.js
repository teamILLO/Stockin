import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as groups from '../../../store/groups/groups';
import EditStock from './EditStock';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import { Input } from 'semantic-ui-react';


const mockStore = getMockStore(
    { loggingIn: true, user: { email: 'test@email.com', nickname: 'nickname', id: 1 } },
    { stockList: [] },
    { priceList: [] },
    { commentList: [] },
    { news: [] },
    { fs: [] },
    { group : [], 
      groupList : [
        { 'id' : 1,
          'name' : 'custom group1',
          'stocks' : [{'id' : 1, 'title' : 'stock1'}, {'id' : 2, 'title' : 'stock2'}]},
        { 'id' : 2,
          'name' : 'custom group2',
          'stocks' : [{'id' : 1, 'title' : 'stock1'}, {'id' : 2, 'title' : 'stock2'}]},
      ] 
    },
  );

describe('<EditStock />', () => {
    let editStock, spyDelete, spyGet, spyDeleteGroupStock, spyUseRef;
    beforeEach(() => {
      editStock = (
        <Provider store={mockStore}>
          <EditStock history={history}/>
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
                    { 'id' : 1,
                      'name' : 'custom group1',
                      'stocks' : [{'id' : 2, 'title' : 'stock2'}]},
                    { 'id' : 2,
                      'name' : 'custom group2',
                      'stocks' : [{'id' : 1, 'title' : 'stock1'}, {'id' : 2, 'title' : 'stock2'}]},
                  ]
              };
              resolve(result);
        });
      });

      spyDeleteGroupStock = jest
        .spyOn(groups, 'deleteGroupStock')
        .mockImplementation((group_id, stock_id) => {
            return (dispatch) => {};
        });

    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render without errors', () => {
        render(editStock);
        const query = screen.queryAllByText(/delete/i, { selector: 'button' });
        expect(query.length).toBe(1);
    });

    it('should render dropdown component', () => {
        render(editStock);
        fireEvent.click(screen.getByRole('listbox'));
        const options = screen.getAllByRole('option');
        fireEvent.click(options[0]);
    });

    it('should change state when clicked checkbox', () => {
        const { container } = render(editStock);
        fireEvent.click(screen.getByRole('listbox'));
        const options = screen.getAllByRole('option');
        fireEvent.click(options[0]);
        let input = container.querySelector('input[value="1 1"]');
        fireEvent.click(input);
        fireEvent.click(input);
    });

    it('should delete when clicked delete button', () => {
        const { container } = render(editStock);
        fireEvent.click(screen.getByRole('listbox'));
        const options = screen.getAllByRole('option');
        fireEvent.click(options[0]);
        let input = container.querySelector('input[value="1 1"]');
        fireEvent.click(input);
        fireEvent.click(screen.getByText(/delete/i, { selector: 'button' }));
        expect(spyDeleteGroupStock).toHaveBeenCalledTimes(1);
    });

    it('handle when checkedItem is not empty', () => {
      spyUseRef = jest.spyOn(React, 'useRef').mockImplementation((arg) => ({current : ["1 1", "1 2", "2 1", "2 2"]}));
      const { container } = render(editStock);
    });
});
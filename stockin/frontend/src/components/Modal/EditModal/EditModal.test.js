import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import EditModal from './EditModal';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import store from '../../../store/store';


describe('<EditModal />', () => {
    let editModal, spyGet;

    beforeEach(() => {
      editModal = (
        <Provider store={store}>
          <EditModal trigger={<button>trigger</button>}/>
        </Provider>
      );

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
        render(editModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        const query = screen.queryAllByText(/관심종목 관리/i);
        expect(query.length).toBe(1);
    });

    it('should change panes', () => {
        const { container } = render(editModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        fireEvent.click(screen.getByText(/그룹 수정/i, { selector: 'a' }));
    });

    it('should close with close button', () => {
        const { container } = render(editModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        fireEvent.click(screen.getByText(/취소/i, { selector: 'button' }));
        const query = screen.queryAllByText(/관심종목 관리/i);
        expect(query.length).toBe(0);
    });

    it('should close with confirm button', () => {
        const { container } = render(editModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        fireEvent.click(screen.getByText(/확인/i, { selector: 'button' }));
        let query = screen.queryAllByText(/관심종목 관리/i);
        expect(query.length).toBe(0);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        query = screen.queryAllByText(/관심종목 관리/i);
        expect(query.length).toBe(1);
        fireEvent.click(screen.getByText('종목 수정'));
    });
});
import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import MakeNewGroupModal from './MakeNewGroupModal';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';
import store from '../../../store/store';


describe('<MakeNewGroupModal />', () => {
    let makeNewGroupModal, spyGet;

    beforeEach(() => {
      makeNewGroupModal = (
        <Provider store={store}>
          <MakeNewGroupModal trigger={<button>trigger</button>}/>
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
        render(makeNewGroupModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        const query = screen.queryAllByText(/Create New Group/i);
        expect(query.length).toBe(1);
    });

    it('should close when clicked cancel button', () => {
        render(makeNewGroupModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        fireEvent.click(screen.getByText(/Cancel/i, { selector: 'button' }));
    });

    it('should handle input value', () => {
        render(makeNewGroupModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        const query = screen.getByPlaceholderText('New Group');
        fireEvent.change(query, { target: { value: 'test_group' } });
    });

    it('should close when clicked confirm button', () => {
        render(makeNewGroupModal);
        fireEvent.click(screen.getByText(/trigger/i, { selector: 'button' }));
        const query = screen.getByPlaceholderText('New Group');
        fireEvent.change(query, { target: { value: 'test_group' } });
        fireEvent.click(screen.getByText(/Confirm/i, { selector: 'button' }));
    });
});
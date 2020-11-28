import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import { getMockStore } from '../../../test-utils/mocks';
import MyInterestsDetail from './MyInterestsDetail';
import { Provider } from 'react-redux';
import { api } from '../../../api/index';

const mockStore = getMockStore(
    { loggingIn: true, user: { email: 'test@email.com', nickname: 'nickname', id: 1 } },
    { stockList: [] },
    { priceList: [] },
    { commentList: [] },
    { news: [] },
    { fs: [] },
    { group : [], 
      groupList : [
        { 'id' : 2, 'name' : 'custom group2', 'stocks' : [{'id' : 1}] }, 
        { 'id' : 1, 'name' : 'custom group1', 'stocks' : [{'id' : 1}] },
      ]
    },
);

describe('<MyInterestsDetail />', () => {
    let myInterestsDetail, spyGet;
    beforeEach(() => {
      myInterestsDetail = (
        <Provider store={mockStore}>
          <MyInterestsDetail />
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
        render(myInterestsDetail);
    });
});
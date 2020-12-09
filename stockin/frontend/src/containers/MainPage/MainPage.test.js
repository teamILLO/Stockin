import React from 'react';
import { render, queryAllByTestId, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as authentication from '../../store/authentication/authentication';
import { api } from '../../api/index';




const initialAuthState = { loggingIn: true, user: { id: 1 },
  groupList : [
  { 'id' : 2, 'name' : 'custom group2', 'stocks' : [{'id' : 1}] }, 
  { 'id' : 1, 'name' : 'custom group1', 'stocks' : [{'id' : 1}] },
  ] 
};
const initialAuthStateLogout = { loggingIn: false, user: null };
const initialAuthStateUndefined = { loggingIn: undefined, user: null };
const mockStore = getMockStore(initialAuthState);
const mockStoreLogout = getMockStore(initialAuthStateLogout);
const mockStoreUndefined = getMockStore(initialAuthStateUndefined);

jest.mock('../../components/Header/Header', () => {
  return jest.fn((props) => {
    return <div className="spyHeader"></div>;
  });
});

jest.mock('../../components/Footer/Footer', () => {
  return jest.fn((props) => {
    return <div className="spyFooter"></div>;
  });
});

jest.mock('../../components/StockBlock/StockBlock', ()=>{
  return jest.fn((props) => {
    return <div className="stockBlock"></div>;
  });
})

jest.mock('react-slick',()=>{
  return jest.fn((props)=>{
    return <div></div>
  })
})

describe('<MainPage />', () => {
  let mainPage, mainPageLogout, mainPageUndefined, spyHistoryPush, spyCheckLogin, spyGet;

  beforeEach(() => {
    mainPage = (
      <Provider store={mockStore}>
        <MainPage history={history} />
      </Provider>
    );

    mainPageLogout = (
      <Provider store={mockStoreLogout}>
        <MainPage history={history} />
      </Provider>
    );

    mainPageUndefined = (
      <Provider store={mockStoreUndefined}>
        <MainPage history={history} />
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((text) => {
      return (dispatch) => {};
    });
    spyCheckLogin = jest.spyOn(authentication, 'checkLogin').mockImplementation(() => {
      return (dispatch) => {};
    });

    spyGet = jest.spyOn(api,'get').mockImplementation((url) => {
      console.log('@@@@@@@@@',url)

      if(url==='/groups/')
        return new Promise((resolve,reject)=>{
          let result
          result = {
            data:[
                  {'id' : 1, 'name' : 'custom group2', 'stocks' : [{'id' : 1}] },
                  {'id' : 2, 'name' : 'custom group2', 'stocks' : [{'id' : 1}] },
                  {'id' : 3, 'name' : 'custom group2', 'stocks' : [{'id' : 1}] },
                 ]
                  
            ,  
            status: 203,
          }
          resolve(result);
        })
      return new Promise((resolve, reject) => {
        let result
        
        result = {
          data:[
                {'id':1, 'score':1},
                {'id':2, 'score':1},
                {'id':3, 'score':1},
                {'id':4, 'score':1},
                {'id':5, 'score':1},
               ]
                
          ,  
          status: 203,
        }
        resolve(result);
    });
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

 

  // it('should redirect when loggingIn = false', () => {
  //   render(mainPageLogout);
  //   expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  // });

  // it('should dispatch checkLogin when loggingIn = undefined', () => {
  //   render(mainPageUndefined);
  //   expect(spyCheckLogin).toHaveBeenCalledTimes(1);
  // });

  it('should change tab when click tab', () => {
    const { container } = render(mainPage);
    fireEvent.click(screen.getAllByTestId('interestTab')[0]);
    fireEvent.click(screen.getAllByTestId('interestTab')[0]);
    fireEvent.click(screen.getAllByTestId('dailyTab')[0]);
    fireEvent.click(screen.getAllByTestId('dailyTab')[0]);
    const query = queryAllByTestId(container, 'interestTab');
    expect(query.length).toBe(1);
  });

});

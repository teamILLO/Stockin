import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../store/store';
import { createSlice } from '@reduxjs/toolkit';

const getMockAuthentication = jest.fn((initialState) => (state = initialState, action) => {
  return state;
});

const getMockStock = jest.fn((initialState) => (state = initialState, action) => {
    return state;
  });

export const getMockStore = (initialAuthState, initialStockState) => {
  const mockAuthentication = getMockAuthentication(initialAuthState);
  const mockStock = getMockStock(initialStockState); 
  const rootReducer = combineReducers({
    router: connectRouter(history),
    authentication: mockAuthentication,
    stock: mockStock,
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
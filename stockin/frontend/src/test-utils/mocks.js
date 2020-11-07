import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../store/store';
import { createSlice } from '@reduxjs/toolkit';

// const getMockAuthentication = (initialState) =>
//   createSlice({
//     name: 'authentication',
//     initialState,
//     reducers: {
//       login() {},
//       logout() {},
//     },
//   });

const getMockAuthentication = jest.fn((initialState) => (state = initialState, action) => {
  console.log(state);
  console.log(action);
  return state;
});

export const getMockStore = (initialAuthState) => {
  const mockAuthentication = getMockAuthentication(initialAuthState);
  const rootReducer = combineReducers({
    router: connectRouter(history),
    authentication: mockAuthentication,
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

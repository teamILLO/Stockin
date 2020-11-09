import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authentication from './authentication';
import signup from './signup';
import stockHistory from './stockHistory';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  authentication,
  signup,
  stockHistory,
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;

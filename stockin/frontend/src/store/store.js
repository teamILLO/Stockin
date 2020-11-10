import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authentication from './authentication/authentication';
import signup from './signup';
import comment from './comment';
import stock from './stock';
import news from './news';
import financialstats from './financialstats';
import stockHistory from './stockHistory';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  fs: financialstats,
  authentication,
  signup,
  comment,
  stock,
  news,
  stockHistory,
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;

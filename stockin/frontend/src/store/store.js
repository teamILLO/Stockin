import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authentication from './authentication/authentication';
import comment from './comment/comment';
import stock from './stock/stock';
import news from './news/news';
import financialstats from './financialstats/financialstats';
import stockHistory from './stockHistory/stockHistory';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  authentication,
  stock,
  stockHistory,
  comment,
  news,
  fs: financialstats,
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;

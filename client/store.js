import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory();

import test from './reducers/test-reducer';

const rootReducer = combineReducers({
  test,
  routing : routerReducer
});

const rootMiddleware = applyMiddleware(
  routerMiddleware(history),
  thunk
);

export default createStore(
  rootReducer,
  'development' === process.env.NODE_ENV ? composeWithDevTools(rootMiddleware) : rootMiddleware
);

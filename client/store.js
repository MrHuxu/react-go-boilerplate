import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import test from './reducers/test-reducer';

export const history = createBrowserHistory();

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

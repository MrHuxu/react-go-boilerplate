import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

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

export default compose(rootMiddleware)(createStore)(rootReducer);

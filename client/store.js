import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const rootReducer = combineReducers({
  routing : routerReducer
});

const rootMiddleware = applyMiddleware(
  routerMiddleware(history),
  thunk
);

export default compose(rootMiddleware)(createStore)(rootReducer);

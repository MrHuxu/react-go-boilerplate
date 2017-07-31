import '../node_modules/nprogress/nprogress.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import App from './components/app';

render(
  <Provider store = {store}>
    <ConnectedRouter history = {history}>
      <Route path = '/' component = {App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('bug-bash-tools')
);

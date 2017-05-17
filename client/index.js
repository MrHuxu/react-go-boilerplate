import '../node_modules/nprogress/nprogress.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { StyleRoot } from 'radium';
import store, { history } from './store';

import App from './components/App';

import { appContainer } from './styles/app';

render(
  <Provider store = {store}>
    <StyleRoot style = {appContainer}>
      <ConnectedRouter history = {history}>
        <Route path = '/' component = {App} />
      </ConnectedRouter>
    </StyleRoot>
  </Provider>,
  document.getElementById('bug-bash-tools')
);

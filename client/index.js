import '../node_modules/nprogress/nprogress.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import store, { history } from './store';

import App from './components/app';

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App } />
    </Router>
  </Provider>,
  document.getElementById('react-go-boilerplate')
);

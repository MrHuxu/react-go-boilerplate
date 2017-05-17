import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

import { shape, bool, object, string } from 'prop-types';

import Get from './Get';
import Post from './Post';

const App = ({ match }) => (
  <div>
    <Link to = '/get'> to Get </Link>
    <Link to = '/post'> to Post </Link>

    <div>
      {('/' === window.location.hostname || match.isExact) ? (
        <Redirect to = {'/get'} />
      ) : null}
      <Route path = '/get' component = {Get} />
      <Route path = '/post' component = {Post} />
    </div>
  </div>
);
App.propTypes = {
  match : shape({
    isExact : bool.isRequired,
    params  : object,
    path    : string.isRequired,
    url     : string.isRequired
  }).isRequired
};

export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Style } from 'radium';
import { Button } from 'antd';

import { shape, bool, object, string, func } from 'prop-types';

import Get from './get';
import Post from './post';
import Random from './random';

import { global, btnArea } from '../styles/app';

/**
 * Use stateful component for enabling the hot module reload
 * HMR is not working for stateless component and it will reload the whole page
 */

class App extends Component {
  render () {
    const { match, push } = this.props;
    return (
      <div>
        <Style rules={ global } />
        <h1> React & Go Boilerplate </h1>
        <div style={ btnArea }>
          <Link to="/get">
            <Button type="primary"> to Get </Button>
          </Link>

          <Link to="/post">
            <Button type="primary"> to Post </Button>
          </Link>

          <Button type="primary" onClick={ () => push(`/random?${Math.random()}`) }>
          to Random
          </Button>
        </div>

        <div>
          { ('/' === window.location.hostname || match.isExact) ? (
            <Redirect to={ '/get' } />
          ) : null }
          <Route path="/get" component={ Get } />
          <Route path="/post" component={ Post } />
          <Route path="/random" component={ Random } />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  match : shape({
    isExact : bool.isRequired,
    params  : object,
    path    : string.isRequired,
    url     : string.isRequired
  }).isRequired,
  push : func.isRequired
};

const mapDispatchToProps = { push };

export default connect(null, mapDispatchToProps)(App);

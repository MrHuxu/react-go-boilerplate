import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Style } from 'radium';

import { shape, bool, object, string, func } from 'prop-types';

import Get from './get';
import Post from './post';
import Random from './random';

import { global, naviPanel, naviBtn, resultPanel } from '../styles/app';

/**
 * Use stateful component for enabling the hot module reload
 * HMR is not working for stateless component and it will reload the whole page
 */
// import { Component } from 'react';

// class App extends Component {
//   render () {
//     let { match } = this.props;
//     return (
//       <div>
//         <Link to = '/get'> to Get </Link>
//         <Link to = '/post'> to Post </Link>

//         <div>
//           {('/' === window.location.hostname || match.isExact) ? (
//             <Redirect to = {'/get'} />
//       ) : null}
//           <Route path = '/get' component = {Get} />
//           <Route path = '/post' component = {Post} />
//         </div>
//       </div>
//     );
//   }
// }

const App = ({ match, push }) => (
  <div>
    <Style rules={ global } />
    <div style={ naviPanel }>
      <Link to="/get">
        <button style={ naviBtn }> to Get </button>
      </Link>

      <Link to="/post">
        <button style={ naviBtn } > to Post </button>
      </Link>

      <button style={ naviBtn } onClick={ () => push(`/random?${Math.random()}`) }>
        to Random
      </button>
    </div>

    <div style={ resultPanel }>
      {('/' === window.location.hostname || match.isExact) ? (
        <Redirect to={ '/get' } />
      ) : null}
      <Route path="/get" component={ Get } />
      <Route path="/post" component={ Post } />
      <Route path="/random" component={ Random } />
    </div>

  </div>
);

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

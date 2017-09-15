import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

const Randim = ({ search }) => (
  <div>
    <h1> this is a Random </h1>
    <p> { search } </p>
  </div>
);

Randim.propTypes = {
  search : string.isRequired
};

const mapStateToProps = ({ routing }) => ({
  search : routing.location.search
});

export default connect(mapStateToProps)(Randim);

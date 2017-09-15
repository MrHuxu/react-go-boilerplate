import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Button } from 'antd';
import { createSomething } from '../actions/test-actions';

const Post = ({ createSomething }) => {
  let value;

  return (
    <div>
      key:
      <input placeholder="value" ref={ node => value = node } />

      <Button onClick={ () => {
        createSomething({ key: value.value });
      } }>
        post!
      </Button>
    </div>
  );
};

Post.propTypes = {
  createSomething : func.isRequired
};

const mapDispatchToProps = { createSomething };

export default connect(null, mapDispatchToProps)(Post);

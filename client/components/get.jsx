import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Button } from 'antd';
import { fetchSomething } from '../actions/test-actions';

const Get = ({ fetchSomething }) => {
  let key, value;

  return (
    <div>
      <input placeholder="key" ref={ node => key = node } />
      <input placeholder="value" ref={ node => value = node } />

      <Button onClick={ () => {
        const tmp = {};
        tmp[key.value] = value.value;
        fetchSomething(tmp);
      } }
      >
        get!
      </Button>
    </div>
  );
};

Get.propTypes = {
  fetchSomething : func.isRequired
};

const mapDispatchToProps = { fetchSomething };

export default connect(null, mapDispatchToProps)(Get);

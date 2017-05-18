import {
  REFRESH_RESULT
} from '../actions/test-actions';

export default (state = {
  result : null
}, action) => {
  let copy = Object.assign({}, state);
  let { type, content } = action;

  switch (type) {
    case REFRESH_RESULT:
      copy.result = content;
      break;

    default:
      return state;
  }

  console.log(copy.result);
  return copy;
};

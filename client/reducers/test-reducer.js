import {
  REFRESH_RESULT
} from '../actions/test-actions';

export default (state = {
  result : null
}, action) => {
  const copy = Object.assign({}, state);
  const { type, content } = action;

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

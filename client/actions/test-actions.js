import $ from 'jquery';

export const REFRESH_RESULT = 'REFRESH_RESULT';
export const refreshResult = data => ({
  type    : REFRESH_RESULT,
  content : data
});

export const fetchSomething = condition => {
  return dispatch => {
    let request = new Request(`/test?${$.param(condition)}`);
    fetch(request).then(res => res.json()).then(data => {
      dispatch(refreshResult(data));
    });
  };
};

export const createSomething = condition => {
  return dispatch => {
    let request = new Request('/test/', {
      method : 'POST',
      body   : JSON.stringify(condition)
    });
    fetch(request).then(res => res.json()).then(data => {
      dispatch(refreshResult(data));
    });
  };
};

import $ from 'jquery';
import nprogress from 'nprogress';

export const REFRESH_RESULT = 'REFRESH_RESULT';
export const refreshResult = data => ({
  type    : REFRESH_RESULT,
  content : data
});

export const fetchSomething = condition => {
  nprogress.start();
  return dispatch => {
    const request = new Request(`/test?${$.param(condition)}`);

    fetch(request).then(res => res.json()).then(data => {
      nprogress.done();
      dispatch(refreshResult(data));
    });
  };
};

export const createSomething = condition => {
  nprogress.start();
  return dispatch => {
    const request = new Request('/test/', {
      method : 'POST',
      body   : JSON.stringify(condition)
    });

    fetch(request).then(res => res.json()).then(data => {
      nprogress.done();
      dispatch(refreshResult(data));
    });
  };
};

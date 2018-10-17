import http from 'http';
import assert from 'assert';

import '../src/app';

describe('Load API server', () => {

  it('should return 200', done => {

    http.get('http://127.0.0.1:3000', res => {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});
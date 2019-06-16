import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import server from '../../src/server/app';
import Todo from '../../src/models/todo';

chai.should();
chai.use(chaiHttp);

// #region --> MODULES TO MOCK <--
const todoServiceMock = require('../../src/services/todoService');
// #endregion

describe('[GET] /todos', function() {

  afterEach(() => {
    sinon.restore();
  });

  it('should return "No Content" status.', function(done) {

    sinon.replace(todoServiceMock, 'getTodos', sinon.fake(() => {
      return [];
    }));

    chai.request(server)
    .get('/todos')
    .end((err,res) => {
      if (err) throw err;

      res.should.have.status(204);
      res.should.have.property('ok').equal(true);
      res.should.have.property('error').equal(false);
      res.should.have.property('noContent').equal(true);
      done();
    });
  });

  it('should return a list of 2 TODOs', function(done) {

    const todo1 = new Todo({ task: 'Complete unit tests'});
    const todo2 = new Todo({ task: 'Get some milk', status: 'overdue'});

    sinon.replace(todoServiceMock, 'getTodos', sinon.fake(() => {
      return [todo1, todo2];
    }));

    chai.request(server)
    .get('/todos')
    .end((err,res) => {
      if (err) throw err;

      res.should.have.status(200);
      res.should.have.property('ok').equal(true);
      res.should.have.property('error').equal(false);
      res.should.be.json;
      res.body.should.have.property('todos').to.be.a('array').lengthOf(2);
      done();
    });
  });
})
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

describe('[POST] /todos', function() {

  afterEach(() => {
    sinon.restore();
  });

  it('should reject an empty body', (done) => {

    chai.request(server)
    .post('/todos')
    .send({
    })
    .end((err,res) => {
      if (err) throw err;

      res.should.have.status(422);
      res.should.have.property('unprocessableEntity').equal(true);
      res.should.have.property('ok').equal(false);
      res.should.have.property('clientError').equal(true);
      res.should.be.json;
      res.body.should.have.property('err').to.be.an('object')
      .to.have.all.keys('code', 'dtls', 'msg', 'type');
      done();
    });
  });

  it('should reject when send an invalid "status"', (done) => {

    chai.request(server)
    .post('/todos')
    .send({
      task: 'Testing todo POST',
      status: 'invalid-status'
    })
    .end((err,res) => {
      if (err) throw err;

      res.should.have.status(422);
      res.should.have.property('unprocessableEntity').equal(true);
      res.should.have.property('ok').equal(false);
      res.should.have.property('clientError').equal(true);
      res.should.be.json;
      res.body.should.have.property('err').to.be.an('object')
      .to.have.all.keys('code', 'dtls', 'msg', 'type');

      res.body.err.code.should.be.a('string').equal('001');
      res.body.err.type.should.be.a('string').equal('VALIDATION_EXCEPTION');
      res.body.err.msg.should.be.a('string');
      res.body.err.dtls.should.be.an('array').to.have.length.above(0);
      res.body.err.dtls[0].should.be.an('object')
      .to.have.all.keys('location', 'msg', 'path', 'type', 'value');
      res.body.err.dtls[0].path.should.equal('status');

      done();
    });
  });

  it('should save a valid todo item with default status', (done) => {
    const SUT = {
      task: 'Create save todo unit test'
    };

    sinon.replace(todoServiceMock, 'createTODO', sinon.fake(async (task, status) => {
      const data = {
        task,
        status
      };
      const model = new Todo(data);

      return Promise.resolve(model);
    }));

    chai.request(server)
    .post('/todos')
    .send(SUT)
    .end((err,res) => {
      if (err) throw err;

      res.should.have.status(201);
      res.should.have.property('ok').equal(true);
      res.should.have.property('created').equal(true);
      res.should.be.json;
      res.body.should.have.property('success').equal(true);
      res.body.should.have.property('todo')
        .to.be.an('object');
      res.body.todo.should.have.property('_id');
      res.body.todo.should.have.property('task')
        .equal('Create save todo unit test');
      res.body.todo.should.have.property('status')
        .equal('pending');

      done();
    });
  });

})
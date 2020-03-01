import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

const {
  expect,
} = chai;
chai.use(chaiHttp);
const server = () => chai.request(app);
const API_PREFIX = '/api/v1/auth';

describe('User signup ', () => {
  it('should signup a user successfully', (done) => {
    server()
      .post(`${API_PREFIX}/signup`)
      .send({
        username: 'Jande Doe',
        email: 'testuser@mail.com',
        password: 'Password',
        confirmPassword: 'Password',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body)
          .to.have.property('user')
          .to.be.an('object');
        expect(res.body.user)
          .to.have.property('message')
          .equal('Account has been created successfully!');
        expect(res.body.user)
          .to.have.property('token');
        done();
      });
  });
  it('should not signup a user that already exists', (done) => {
    server()
      .post(`${API_PREFIX}/signup`)
      .send({
        username: 'Jande Doe',
        email: 'testuser@mail.com',
        password: 'Password',
        confirmPassword: 'Password',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body)
          .to.have.property('errors')
          .to.be.an('object');
        expect(res.body.errors)
          .to.have.property('message')
          .equal('This user already exist');
        done();
      });
  });
});


describe('User signin ', () => {
  it('should signin a user successfully', (done) => {
    server()
      .post(`${API_PREFIX}/signin`)
      .send({
        email: 'testuser@mail.com',
        password: 'Password',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property('user')
          .to.be.an('object');
        expect(res.body.user)
          .to.have.property('message')
          .equal('User successfully logged in');
        expect(res.body.user)
          .to.have.property('token');
        done();
      });
  });
  it('should not signin a user that does not exists', (done) => {
    server()
      .post(`${API_PREFIX}/signin`)
      .send({
        email: 'testusers@mail.com',
        password: 'Password',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('errors')
          .to.be.an('object');
        expect(res.body.errors)
          .to.have.property('message')
          .equal('This user does not exist');
        done();
      });
  });
});

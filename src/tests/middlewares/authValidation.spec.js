import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import { getUserData, emptyUserData } from '../mockdata/seededUsers';

chai.use(chaiHttp);
const { expect } = chai;
const API_PREFIX = '/api/v1/auth';

describe('User signup validations', () => {
  it('should return 400 on empty request body or if any of the field is empty', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/signup`)
      .send(emptyUserData)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('email')
          .eql('Email is required');
        expect(res.body.errors).to.have.property('username')
          .eql('Username is required');
        expect(res.body.errors).to.have.property('password')
          .eql('Password is required');
        done();
      });
  });

  it('should return 400 if email is invalid', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserData({ email: 'invalidemail' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('email')
          .eql('Please input a valid email address');
        done();
      });
  });

  it('should return 400 if password is less than 8 characters', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/signup`)
      .send(getUserData({ password: 'test' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('password')
          .eql('Password must be at least 6 characters');
        done();
      });
  });
});


describe('User logn validations', () => {
  it('should return 400 on empty request body or if any of the field is empty', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/signin`)
      .send(emptyUserData)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('email')
          .eql('Email is required');
        expect(res.body.errors).to.have.property('password')
          .eql('Password is required');
        done();
      });
  });
  it('should return 400 if email is invalid', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/signin`)
      .send(getUserData({ email: 'invalidemail' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('email')
          .eql('Please input a valid email address');
        done();
      });
  });
});

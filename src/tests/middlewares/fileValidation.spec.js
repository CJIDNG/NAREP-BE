import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import multer from 'multer';
import app from '../../server';
import { adminSignin } from '../mockdata/seededUsers';

const upload = multer({ dest: '/tmp/' });

app.use(upload.any());

chai.use(chaiHttp);

const { expect } = chai;
const API_PREFIX = '/api/v1/';
const request = supertest(app);
let authorizedUser;

describe('Files Validation', () => {
  before((done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send(adminSignin)
      .end((err, res) => {
        const { token } = res.body.user;
        authorizedUser = token;
        done();
      });
  });

  it('should return 400 on empty request body or if any of the field is empty', (done) => {
    request
      .post(`${API_PREFIX}/files/uploads`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .set('Accept', '*/*')
      .field('title', '')
      .field('description', '')
      .field('sector', '')
      .field('fileType', '')
      .field('slug', '')
      .field('numberOfDownload', 0)
      .field('fileName', '')
      .field('userId', '')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('title')
          .eql('Title is required');
        expect(res.body.errors).to.have.property('description')
          .eql('Description is required');
        expect(res.body.errors).to.have.property('sector')
          .eql('Sector is required');
        done();
      });
  });
});

/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import multer from 'multer';
import app from '../../server';
import { adminSignin } from '../mockdata/seededUsers';

const upload = multer({ dest: '/tmp/' });

app.use(upload.any());

const {
  expect,
} = chai;

chai.use(chaiHttp);

const request = supertest(app);
const API_PREFIX = '/api/v1';
const file = `${__dirname}/Mojito.jpg`;
let authorizedUser;
let fileName;
const slug = 'lorem-12939933';

describe('Files update', () => {
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
  it('should update a file successfully', (done) => {
    request
      .put(`${API_PREFIX}/files/${slug}`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .set('Accept', '*/*')
      .field('title', 'new title')
      .field('description', 'new description')
      .field('sector', 'Oil and Gas')
      .field('fileName', '3a9bf557ba3f6188444237abcfa93b31')
      .field('userId', '5b8e15ed-2113-4e58-a533-c24d1b09d856')
      .attach('file', file, './Mojito.jpg')
      .set('Authorization', `Bearer ${authorizedUser}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('file');
        expect(res.body.file).to.be.to.a('object');
        expect(res.body.file).to.have.property('message')
          .eql('File has been updated successfully!');
        done();
      });
  });
});

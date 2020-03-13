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

describe('Files downloads', () => {
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
  before((done) => {
    request
      .post(`${API_PREFIX}/files/uploads`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .set('Accept', '*/*')
      .field('title', 'testfiles')
      .field('description', 'lorem ipsum dolor')
      .field('sector', 'Oil and Gas')
      .field('fileType', 'png')
      .field('slug', 'testfiles-12939933')
      .field('numberOfDownload', 0)
      .field('userId', '5b8e15ed-2113-4e58-a533-c24d1b09d856')
      .attach('file', file, './Mojito.jpg')
      .end((err, res) => {
        const { createdFile } = res.body.file;
        fileName = createdFile.fileName;
        done();
      });
  });
  it('should download a file successfully', (done) => {
    request
      .get(`/api/v1/files/downloads?filename=${fileName}`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        done();
      });
  });
});

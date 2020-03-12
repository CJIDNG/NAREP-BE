import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import multer from 'multer';
import app from '../../server';
import { adminSignin, userSignin } from '../mockdata/seededUsers';

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
let unauthorizedUser;

describe('Files upload', () => {
  before((done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send(adminSignin)
      .end((err, res) => {
        const { token } = res.body.user;
        authorizedUser = token;
      });
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send(userSignin)
      .end((err, res) => {
        const { token } = res.body.user;
        unauthorizedUser = token;
        done();
      });
  });

  it('should upload a file successfully', (done) => {
    request
      .post(`${API_PREFIX}/files/uploads`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .set('Accept', '*/*')
      .field('title', 'testfile')
      .field('description', 'lorem ipsum dolor')
      .field('sector', 'Oil and Gas')
      .field('fileType', 'png')
      .field('slug', 'testfile-12939933')
      .field('numberOfDownload', 0)
      .field('fileName', '3a9bf557ba3f6188444237abcfa93b31')
      .field('userId', '5b8e15ed-2113-4e58-a533-c24d1b09d856')
      .attach('file', file, './Mojito.jpg')
      .end((err, res) => {
        expect(res.status).to.be.eql(201);
        expect(res.body).to.have.property('file');
        expect(res.body.file).to.be.to.a('object');
        expect(res.body.file).to.have.property('message')
          .eql('file has been created successfully!');
        done();
      });
  });
  it('should not allow an unauthorized user to upload a file', (done) => {
    request
      .post(`${API_PREFIX}/files/uploads`)
      .set('Authorization', `Bearer ${unauthorizedUser}`)
      .set('Accept', '*/*')
      .field('title', 'testfile')
      .field('description', 'lorem ipsum dolor')
      .field('sector', 'Oil and Gas')
      .field('fileType', 'png')
      .field('slug', 'testfile-12939933')
      .field('numberOfDownload', 0)
      .field('fileName', '3a9bf557ba3f6188444237abcfa93b31')
      .field('userId', '5b8e15ed-2113-4e58-a533-c24d1b09d856')
      .attach('file', file, './Mojito.jpg')
      .end((err, res) => {
        expect(res.status).to.be.eql(403);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('message')
          .eql('Only Admin can access this route');

        done();
      });
  });
  it('should throw an error if no token is provided', (done) => {
    request
      .post(`${API_PREFIX}/files/uploads`)
      .set('Accept', '*/*')
      .field('title', 'testfile')
      .field('description', 'lorem ipsum dolor')
      .field('sector', 'Oil and Gas')
      .field('fileType', 'png')
      .field('slug', 'testfile-12939933')
      .field('numberOfDownload', 0)
      .field('fileName', '3a9bf557ba3f6188444237abcfa93b31')
      .field('userId', '5b8e15ed-2113-4e58-a533-c24d1b09d856')
      .attach('file', file, './Mojito.jpg')
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('message')
          .eql('Invalid or No token provided');

        done();
      });
  });
  it('should throw an error if the file already exist', (done) => {
    request
      .post(`${API_PREFIX}/files/uploads`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .set('Accept', '*/*')
      .field('title', 'testfile')
      .field('description', 'lorem ipsum dolor')
      .field('sector', 'Oil and Gas')
      .field('fileType', 'png')
      .field('slug', 'testfile-12939933')
      .field('numberOfDownload', 0)
      .field('fileName', '3a9bf557ba3f6188444237abcfa93b31')
      .field('userId', '5b8e15ed-2113-4e58-a533-c24d1b09d856')
      .attach('file', file, './Mojito.jpg')
      .end((err, res) => {
        expect(res.status).to.be.eql(409);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.to.a('object');
        expect(res.body.errors).to.have.property('message')
          .eql('File with this name already exists');
        done();
      });
  });
});

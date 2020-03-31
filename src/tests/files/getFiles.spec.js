import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;
const server = () => chai.request(app);
const API_PREFIX = '/api/v1/files';
const sectorId = '30b113d2-b616-4ea7-8b73-a53a6015f321';
const tagId = '59fe8928-37e4-4bd9-a04e-011e3be32fb5';
const slug = 'lorem-12939933';

describe('Get Files', () => {
  it('should get all files successfully', (done) => {
    server()
      .get(`${API_PREFIX}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('files');
        expect(res.body.files).to.be.to.a('object');
        expect(res.body.files).to.have.property('filesCount');
        expect(res.body.files).to.have.property('allFiles');
        expect(res.body.files.allFiles).to.be.to.an('array');
        done();
      });
  });
  it('should get all files by sector successfully', (done) => {
    server()
      .get(`${API_PREFIX}?sectorId=${sectorId}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('files');
        expect(res.body.files).to.be.to.a('object');
        expect(res.body.files).to.have.property('filesCount');
        expect(res.body.files).to.have.property('allFiles');
        expect(res.body.files.allFiles).to.be.to.an('array');
        done();
      });
  });
  it('should get all files by tag successfully', (done) => {
    server()
      .get(`${API_PREFIX}/tags/${tagId}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('files');
        expect(res.body.files).to.be.to.a('object');
        expect(res.body.files).to.have.property('filesCount');
        expect(res.body.files).to.have.property('allFiles');
        expect(res.body.files.allFiles).to.be.to.an('array');
        done();
      });
  });
  it('should get all files by tag successfully', (done) => {
    server()
      .get(`${API_PREFIX}/${slug}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('file');
        expect(res.body.file).to.be.to.a('object');
        done();
      });
  });
});

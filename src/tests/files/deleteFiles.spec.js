import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import { adminSignin } from '../mockdata/seededUsers';

chai.use(chaiHttp);

const { expect } = chai;
const server = () => chai.request(app);
const API_PREFIX = '/api/v1';
let authorizedUser;
const slug = 'lorem-12939933';

describe('Delete Files', () => {
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
  it('should delete a files successfully', (done) => {
    server()
      .delete(`${API_PREFIX}/files/${slug}`)
      .set('Authorization', `Bearer ${authorizedUser}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('file');
        expect(res.body.file).to.be.to.a('object');
        expect(res.body.file).to.have.property('message').eql('File has been deleted successfully!');
        done();
      });
  });
});

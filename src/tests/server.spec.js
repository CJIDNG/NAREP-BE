import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const {
  expect,
} = chai;
chai.use(chaiHttp);
const server = () => chai.request(app);

describe('Testing app page ', () => {
  it('should return a message from app page.', (done) => {
    server()
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to NAREP API');
        done();
      });
  });
});

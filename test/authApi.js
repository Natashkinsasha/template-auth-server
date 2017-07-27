import chai from 'chai';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
import config from 'config';

import '../src/main';

chai.use(chaiHttp);
chai.use(dirtyChai);

const expect = chai.expect;

describe('Test auth API', () => {

    const port = config.get('server.port');

    describe('', () => {
        it('#post /v1/api/auth/registration', (done) => {
            chai
                .request(`http://localhost:${port}`)
                .post('/v1/api/auth/registration')
                .send({username: 'Alex', password: '1111'})
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('accessToken');
                    expect(res.body).to.have.property('refreshToken');
                    done();
                })
                .catch(done);
        });
    });

});

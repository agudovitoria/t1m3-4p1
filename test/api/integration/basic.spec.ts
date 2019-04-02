import server from '../../../src/api/config/server/server';
// @ts-ignore
const chai:any = require('chai');
const chaiHttp:any = require('chai-http');

chai.use(chaiHttp);

describe('Basic test', (): any => {
    const ENDPOINTS: any = {
        TIMES: {
            GET_BY_USER: '/times'
        }
    };

    it('should fails with an error', (): any => {
        chai.request(server)
            .get(ENDPOINTS.TIMES.GET_BY_USER)
            .end((err:Error, res:Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.an('array');
                chai.expect(res.body).length.to.be(0);
            });
    });
});

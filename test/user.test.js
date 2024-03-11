import {chai} from "chai";
import chaiHttp from "chai-http";
import server from '../server.js'

chai.should();

chai.use(chaiHttp);

describe('Tasks API',()=>{
    describe("GET /",()=>{
        it("IT Testing RootApi",(done)=>{
            chai.request(server)
                .get("/")
                .end((err,response)=>{
                    response.should.have.status(200);
                done();
                })
        })
    })
})
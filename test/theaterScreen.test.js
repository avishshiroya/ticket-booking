import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/theaterScreen';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("THEATERSCREENS API",()=>{
    describe("POST /",()=>{
        it("ADD Theater screen",async()=>{
            // const response = await request.post("/")
            //                 .set('Cookie','aAuth='+cookie)
            //                 .send({
            //                     "theaterId":"65f036f63b39ca30fa619b15",
            //                     "screenType":"3D"
            //                 })
            //                 .then(response=>{
            //                     console.log(response);
            // expect(response.statusCode).to.be.equal(200)
            //                 })
            //                 .catch(error=>{
            //                     console.log(error);
            //                 })
        })
    })
    describe("GET /",()=>{
        it("GET Theater screen",async()=>{
            const response = await request.get("/")
                            .set('Cookie','aAuth='+cookie)
                            .then(response=>{
                                console.log(response.statusCode);
                                expect(response.statusCode).to.be.equal(200)
                            })
                            .catch(error=>{
                                console.log(error);
                            })
        })
    })
    describe("PUT /:id",()=>{
        it("Update Theater screen",async()=>{
            const response = await request.put("/65e562be283fbd6aea1212e9")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "screenType":"3D"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                                expect(response.statusCode).to.be.equal(200)
                            })
                            .catch(error=>{
                                console.log(error);
                            })
        })
    })
    describe("GET /theater",()=>{
        it("Get Theater screen By theater",async()=>{
            const response = await request.get("/theater")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "theaterName":"Brothers"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                                expect(response.statusCode).to.be.equal(200)
                            })
                            .catch(error=>{
                                console.log(error);
                            })
        })
    })
    describe("Delete /:id",()=>{
        it("Delete Theater screen",async()=>{
            // const response = await request.delete("/65e562be283fbd6aea1212e9")
            //                 .set('Cookie','aAuth='+cookie)
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //                 })
            //                 .catch(error=>{
            //                     console.log(error);
            //                 })
        })
    })
})
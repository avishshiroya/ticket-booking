import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/route';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("ROUTE API",()=>{
    describe("POST /",()=>{
        it("Add Route",async()=>{
            // const response = await request.post("/")
            //                 .set('Cookie','aAuth='+cookie)
            //                 .send({
            //                     "category":"train",
            //                     "from":"abc",
            //                     "to":"ghi"
            //                 })
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            //                 })
            //                 .catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })
    describe("GET /",()=>{
        it("GET Route",async()=>{
            const response = await request.get("/")
                            .set('Cookie','aAuth='+cookie)
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("PUT /",()=>{
        it("Update Route",async()=>{
            const response = await request.put("/65e19d6251c8255ad1327a2a")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                from:"surat"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /search/category",()=>{
        it("GET Route By Category",async()=>{
            const response = await request.get("/search/category")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                category:'train'
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /search/from",()=>{
        it("GET Route bt from",async()=>{
            const response = await request.get("/search/from")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                from:"surat"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /search/to",()=>{
        it("GET Route bt to",async()=>{
            const response = await request.get("/search/to")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                to:"ghi"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("DELETE /:id",()=>{
        it("DELETE Route",async()=>{
            // const response = await request.delete("/65f033bed18443c4226f1d27")
                            // .set('Cookie','aAuth='+cookie)
                            // .then(response=>{
                            //     console.log(response.statusCode);
                            // })
                            // .catch(error=>{
                            //     console.error(error);
                            // })
        })
    })

})
import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/promocode';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("PROMOCODE API",()=>{
    describe("POST /",()=>{
        it("add promocode",async()=>{
            const response = await request.post("/")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "code":"GETOFF20",
                                "percentage":20,
                                "description":"It is valid for the one time booking"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    
    describe("GET /",()=>{
        it("get all promocode",async()=>{
            const response = await request.get("/")
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    
    describe("PUT /:id",()=>{
        it("update promocode",async()=>{
            const response = await request.put("/65e83807a0a0f132960ca4c4")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                description:'abccddhi'
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    
    describe("Delete /",()=>{
        it("delete promocode",async()=>{
            // const response = await request.delete("/65f030a80199256679c0acf6")
            //                 .set('Cookie','aAuth='+cookie)
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            //                 })
            //                 .catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })
    
})
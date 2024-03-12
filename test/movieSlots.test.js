import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/movieSlot';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("MOVIE SLOTS API",()=>{
    describe("POST /",()=>{
        it("Add Movie Slot ",async()=>{
            // const response = await request.post("/")
            //                 .set('Cookie','aAuth='+cookie)
            //                 .send({
            //                     "theaterId":"65e1c7d23f307d4e5b51b024",
            //                     "screenId":"65e5496a28cdcb5d81e4c1da",
            //                     "movieId":"65eea750e9b1603be77f4812",
            //                     "showTime":"10:00 am",
            //                     "showDate":"2024-03-13",
            //                     "description":"this moovie in 2D"
            //                 })
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            //                 })
            //                 .catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })
    describe("PUT /:id",()=>{
        it("Update Movie Slot ",async()=>{
            const response = await request.put("/65f028d839c4308d5330d0aa")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "movieId":"65eea750e9b1603be77f4812"  
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
        it("GET ALL Movie Slot ",async()=>{
            const response = await request.get("/")
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /time",()=>{
        it("GET ALL Movie Slot BY TIME ",async()=>{
            const response = await request.get("/time")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "time":"10:00 am"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /name",()=>{
        it("GET ALL Movie Slot BY NAME ",async()=>{
            const response = await request.get("/name")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "movieName":"Movie 123"
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
        it("DELETE Movie Slot  ",async()=>{
            const response = await request.delete("/65f028d839c4308d5330d0aa")
                            .set('Cookie','aAuth='+cookie)
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    
})
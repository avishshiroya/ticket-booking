import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/movieSeat';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("MOVIE SEAT API",()=>{
    describe("POST /",()=>{
        it("add Movie Seat",async()=>{
            const response = await request.post("/")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "row":"a",
                                "startNo":1,
                                "endNo":"21",
                                "movieSlotId":"65eea7a7e9b1603be77f481b",
                                "price":210
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
        it("GET Movie Seat",async()=>{
            const response = await request.get("/")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                movieSlotId:'65eea7a7e9b1603be77f481b'
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("delete /seat",()=>{
        it("Delete Movie Seat",async()=>{
            const response = await request.delete("/seat")
                            .set('Cookie','aAuth='+cookie)
                            .send(
                                {
                                    "row": "a",
                                    "movieSlotId": "65eea7a7e9b1603be77f481b"
                                }
                            )
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("DELETE /",()=>{
        it("DELETE ALL Movie Seat",async()=>{
            const response = await request.delete("/")
                            .set('Cookie','aAuth='+cookie)
                            .send({
                                "movieSlotId":"65eea7a7e9b1603be77f481b",
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
})
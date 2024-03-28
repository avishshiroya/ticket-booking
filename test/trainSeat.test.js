import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/trainSeat';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("Train Seat API",()=>{
    describe("POST /",()=>{
        it("ADD TRAIN SEAT",async()=>{
            // const response = await request.post("/")
            //             .set('Cookie','aAuth='+cookie)
            //             .send({
            //                 "seatClass":"CC",
            //                 "seatStart":1,
            //                 "seatEnd":10,
            //                 "price":200,
            //                 "slotId":"65ee7ea6da21723a4609072c"
            //             })
            //             .then(response=>{
            //                 console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //             })
            //             .catch((error=>{
            //                 console.error(error);
            //             }));
        })
    })
    describe("PUT /:id",()=>{
        it("UPDATE TRAIN SEAT",async()=>{
            const response = await request.put("/65f041b76810904b2b8f272a")
                        .set('Cookie','aAuth='+cookie)
                        .send({
                            "seatClass":"CC",
                            "price":200,
                        })
                        .then(response=>{
                            console.log(response.statusCode);
                            expect(response.statusCode).to.be.equal(200)
                        })
                        .catch((error=>{
                            console.error(error);
                        }));
        })
    })
    describe("GEt /slot/:id",()=>{
        it("GET TRAIN SEAT",async()=>{
            const response = await request.get("/slot/65ee7ea6da21723a4609072c")
                        .then(response=>{
                            console.log(response.statusCode);
                            expect(response.statusCode).to.be.equal(200)
                        })
                        .catch((error=>{
                            console.error(error);
                        }));
        })
    })
    describe("DELETE /",()=>{
        it("DELETE TRAIN SEAT",async()=>{
            const response = await request.delete("/65f042cb8a4345b1beb95a27")
                        .set('Cookie','aAuth='+cookie)
                        .then(response=>{
                            console.log(response.statusCode);
                            expect(response.statusCode).to.be.equal(200)
                        })
                        .catch((error=>{
                            console.error(error);
                        }));
        })
    })
})
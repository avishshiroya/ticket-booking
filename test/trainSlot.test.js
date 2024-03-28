import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/trainSlot';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("TrainSlot API",()=>{
    describe("POST /",()=>{
        it("ADD TrainSlot",async()=>{
            // const response = await request.post("/")
            //                 .set('Cookie',"aAuth="+cookie)
            //                 .send({
            //                     "trainId":"65eae2e8a218ce7ffc15bd48",
            //                     "routeId":"65eaf7607d2a9b2efe418764",
            //                     "viaStations":["a","b"],
            //                     "arrivalTime":"10:15 am",
            //                     "despatureTime":"11:15 pm",
            //                     "arrivalDate":"2024-03-13",
            //                     "despatureDate":"2024-03-14",
            //                     "totalDistance":1500,
            //                     "travellingHours":10
            //                 })
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //                 })
            //                 .catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })
    describe("PUT /:id",()=>{
        it("UPDATE TrainSlot",async()=>{
            const response = await request.put("/65ee7ea6da21723a4609072c")
                            .set('Cookie',"aAuth="+cookie)
                            .send({
                                "totalDistance":550
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                                // expect(response.statusCode).to.be.equal(200)
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /",()=>{
        it("GET TrainSlot",async()=>{
            const response = await request.get("/")
                            .send({
                                "from":"def",
                                "to":"ghi",
                                "date":"2024-03-12"
                            })
                            .then(response=>{
                                console.log(response.statusCode);
                                // expect(response.statusCode).to.be.equal(200)
                            })
                            .catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("DELETE /:id",()=>{
        it("DELETE TrainSlot",async()=>{
            // const response = await request.delete("/65f03fb5d6f240d2619d6e7e")
            //                 .set('Cookie',"aAuth="+cookie)
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //                 })
            //                 .catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })
})
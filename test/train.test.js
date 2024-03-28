import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/train';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("TRAIN API", () => {
    describe("POST /", () => {
        it("ADD Train", async () => {
            // const response = await request.post("/")
            //     .set('Cookie', 'aAuth=' + cookie)
            //     .send({
            //         "category": "train",
            //         "name": "xyz express",
            //         "uniqueId": "ab123as3",
            //         "sourceStn": "abc",
            //         "destinationStn": "xyz",
            //         "viaStations": ["def", "ghi", "lmn"],
            //         "totalDistance": 1100,
            //         "classes": ["FC", "CC", "SL"],
            //         "capacity": 250
            //     })
            //     .then(response => {
            //         console.log(response.body);
            // expect(response.statusCode).to.be.equal(200)
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     })
        })
    })
    describe("PUT /:id", () => {
        it("Update Train", async () => {
            const response = await request.put("/65eae2e8a218ce7ffc15bd48")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    totalDistance: 1000
                })
                .then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("GET /", () => {
        it("GET ALL Train", async () => {
            const response = await request.get("/")
                .set('Cookie', 'aAuth=' + cookie)
                .then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("GET /uniqueId", () => {
        it("GET ALL Train", async () => {
            const response = await request.get("/uniqueId")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "uniqueId": "ab123as2"
                })
                .then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("Delete /:id", () => {
        it("DELETE Train", async () => {
            // const response = await request.delete("/65f03d5121dd10f0420b22ee")
            //     .set('Cookie', 'aAuth=' + cookie)
            //     .then(response => {
            //         console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     })
        })
    })

})
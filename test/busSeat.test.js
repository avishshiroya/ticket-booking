import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/busSeat';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("BUSSEAT API", () => {
    describe("POST /", () => {
        it("Add The Bus Seat", async () => {
            const response = await request.post("/")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "slotId": "65f0030b8799e189a6b8c032",
                    "seatOn": "lower",
                    "seatStart": 1,
                    "seatEnd": 15,
                    "price": 800
                }).then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("PUT /:id", () => {
        it("Update The Bus Seat", async () => {
            const response = await request.put("/65f016851a50d0b2542f5c08")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "inMaintainance": true
                }).then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("GET /:id", () => {
        it("GET The Bus Seat", async () => {
            const response = await request.get("/65f0030b8799e189a6b8c032")
                .then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("DELETE /:id", () => {
        it("DELETE The Bus Seat", async () => {
            const response = await request.delete("/65f016851a50d0b2542f5c08")
                .set('Cookie', 'aAuth=' + cookie)
                .then(response => {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error => {
                    console.error(error);
                })
        })
    })
})
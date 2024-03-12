import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/busSlot';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';


describe('BUSSLOT API', () => {
    describe("POST /", () => {
        it("ADD BUSSSLOT", async () => {
            const response = request.post("/")
                .set("Cookie", 'aAuth=' + cookie)
                .send({
                    "busId": "65e93c9a81b66072c2c42f5b",
                    "routeId": "65e19d6251c8255ad1327a2a",
                    "arrivalTime": "7.00 pm",
                    "despatureTime": "5.00 am",
                    "viaStops": "abc junctions,pqr road",
                    "arrivalDate": "2024-03-15",
                    "despatureDate": "2024-03-16",
                    "totalDistance": 550,
                    "travellingHours": 10
                }).then(response => {
                    console.log(response.statusCode);
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("PUT /:id", () => {
        it("Update BUSSSLOT", async () => {
            const response = request.put("/65e9876c0f473a398231dc6a")
                .set("Cookie", 'aAuth=' + cookie)
                .send({
                    "arrivalDate": "2024-03-13",
                    "despatureDate": "2024-03-14",
                }).then(response => {
                    console.log(response.statusCode);
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("GET /:id", () => {
        it("get seats", async () => {
            const response = request.get("/65e9876c0f473a398231dc6a")
                .then(response => {
                    console.log(response.statusCode);
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("DELETE /:id", () => {
        // it("Delete Slots", async () => {
        //     const response = request.delete("/65f00296d03aca402577efd9")
        //     .set("Cookie", 'aAuth=' + cookie)

        //         .then(response => {
        //             console.log(response.body);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         })
        // })
    })
    describe("GET /route", () => {
        it("busslot By Route", async () => {
            const response = request.get("/route")
                .send({
                    "categoryId": "65e1583a67c838b661901f71",
                    "from": "surat",
                    "to": "amreli",
                    "date": "2024-03-11"
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



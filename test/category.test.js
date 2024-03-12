import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/category';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("Category API", () => {
    describe("POST /add", () => {
        it("ADD CATEGORY", async () => {
            const response = await request.post("/add")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "name": "plane",
                    "type": "traveling"
                })
                .then(response => {
                    console.log(response.statusCode);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("PUT /:id", () => {
        it("UPDATE CATEGORY", async () => {
            const response = await request.put("/65e1581567c838b661901f6b")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "name": "train",
                    "type": "traveling"
                })
                .then(response => {
                    console.log(response.statusCode);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("PUT /:id", () => {
        it("UPDATE CATEGORY", async () => {
            const response = await request.put("/65e1581567c838b661901f6b")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "name": "train",
                    "type": "traveling"
                })
                .then(response => {
                    console.log(response.statusCode);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("GET /get-all", () => {
        it("GET ALL CATEGORY", async () => {
            const response = await request.get('/get-all')
                .then(response => {
                    console.log(response.statusCode);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("GET /type/:sort", () => {
        it("GET ALL CATEGORY BY TYPE SORTING", async () => {
            const response = await request.get('/type/traveling')
                .then(response => {
                    console.log(response.statusCode);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    describe("DELETE /:id", () => {
        it("DELETE THE CATEGORY", async () => {
            const response = await request.delete('/65f01f1faaa1b78e7b80992e')
                .set('Cookie', 'aAuth=' + cookie)
                .then(response => {
                    console.log(response.statusCode);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
})
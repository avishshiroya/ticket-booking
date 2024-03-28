import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/bus';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("BUS API", () => {
    describe("POST /", () => {
        it('Add Bus', async () => {
            // const response = await request.post('/')
            //     .set('Cookie', 'aAuth =' + cookie)
            //     .send({
            //         "name":"pqr",
            //         "type": "sleeper",
            //         "uniqueId": "GJ05 BA 2535",
            //         "categoryId": "65e1583a67c838b661901f71",
            //         "totalSeats": "30"
            //     }).then(response=>{
            //         console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //     }).catch(error=>{
            //         console.error(error);
            //     })
        })
    })
    describe("PUT /:id", () => {
        it('update Bus', async () => {
            const response = await request.put('/65effd7b03e515cd180feee0')
                .set('Cookie', 'aAuth =' + cookie)
                .send({
                    "totalSeats": "35"
                }).then(response=>{
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error=>{
                    console.error(error);
                })
        })
    })
    describe("GET /", () => {
        it('GET ALL BUSES', async () => {
            const response = await request.get('/')
                .then(response=>{
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error=>{
                    console.error(error);
                })
        })
    })
    describe("GET /name", () => {
        it('GET BUSES BY NAME', async () => {
            const response = await request.get('/name')
                .send({
                    name:"pqr"
                })
                .then(response=>{
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error=>{
                    console.error(error);
                })
        })
    })
    describe("GET /uniqueId", () => {
        it('GET BUSES BY NAME', async () => {
            const response = await request.get('/uniqueId')
                .send({
                    "uniqueId":"GJ05 BA 2535"
                })
                .then(response=>{
                    console.log(response.statusCode);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error=>{
                    console.error(error);
                })
        })
    })
    describe("DELETE /:id",()=>{
        it("Delete Bus",async()=>{
            const response = await request.delete('/65effd7b03e515cd180feee0')
            .set('Cookie', 'aAuth =' + cookie)
            .then(response=>{
                console.log(response.statusCode);
                expect(response.statusCode).to.be.equal(200)
            }).catch(error=>{
                console.error(error);
            })

        })
    })
})
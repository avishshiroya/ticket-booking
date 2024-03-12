import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/movieSeatBooking';
const request = supertest(baseUrl);
var auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwNjdmZDc0MjFkZGVjODdkMzA1ZGEiLCJpYXQiOjE3MTAyMjQwODYsImV4cCI6MTcxMDMxMDQ4Nn0.fCYdA5YREj7gpokrs0isBWLX0dRuGoktyoy6mW_y564';

describe('MOVIE BOOKING API',()=>{
    describe("POST /",()=>{
        it("BOOKING OF MOVIE TICKET",async()=>{
            // const response = await request.post("/")
            //                 .set('auth',auth)
            //                 .send({
            //                     "seats":["65e7e57ee4a8816f904a1543","65e7e57ee4a8816f904a1541"],
            //                     "promocode":"GETOFF50"
            //                 })
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            //                 })
            //                 .catch(error=>{
            //                     console.error(errors);
            //                 })
        })
    })
})
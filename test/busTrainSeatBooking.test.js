import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/seatBooking';
const request = supertest(baseUrl);
var auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwNjdmZDc0MjFkZGVjODdkMzA1ZGEiLCJpYXQiOjE3MTAyMjQwODYsImV4cCI6MTcxMDMxMDQ4Nn0.fCYdA5YREj7gpokrs0isBWLX0dRuGoktyoy6mW_y564';


describe("Bus Train Seat Booking API", () => {
    describe("POST /", () => {
        it('Bus Seat Booking', async () => {
            const response = await request.post("/")
                .set('auth', auth)
                .send({
                    "busSeats": ["65f016851a50d0b2542f5c06", "65f016851a50d0b2542f5c04"],
                    "promocode": "",
                    "passanger": [{
                        "name": "abc",
                        "age": 41,
                        "gender": "male"
                    }, {
                        "name": "abc",
                        "age": 41,
                        "gender": "female"
                    }]
                })
                .then(response => {
                    console.log(response.body);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("POST /", () => {
        it('Bus Seat Booking', async () => {
            const response = await request.post("/")
                .set('auth', auth)
                .send({
                    "busSeats": ["65f016851a50d0b2542f5c06", "65f016851a50d0b2542f5c04"],
                    "promocode": "",
                    "passanger": [{
                        "name": "abc",
                        "age": 41,
                        "gender": "male"
                    }, {
                        "name": "abc",
                        "age": 41,
                        "gender": "female"
                    }]
                })
                .then(response => {
                    console.log(response.body);
                    expect(response.statusCode).to.be.equal(200)
                }).catch(error => {
                    console.error(error);
                })
        })
    })
    describe("POST /", () => {
        it('Bus Seat Booking', async () => {
            // const response = await request.post("/")
            //                 .set('auth',auth)
            //                 .send({
            //                     "busSeats":["65f016851a50d0b2542f5c06","65f016851a50d0b2542f5c04"],
            //                     "promocode":"",
            //                     "passanger":[{
            //                         "name":"abc",
            //                         "age":41,
            //                         "gender":"male"
            //                     },{
            //                         "name":"abc",
            //                         "age":41,
            //                         "gender":"female"
            //                     }]
            //                 })
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //                 }).catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })
    describe("POST /train", () => {
        it('Train Seat Booking', async () => {
            // const response = await request.post("/train")
            //                 .set('auth',auth)
            //                 .send({
            //                     "trainSeats":["65ee9046856147d44db7228b","65ee9046856147d44db72289"],
            //                     "promocode":"",
            //                     "passanger":[{
            //                         "name":"abc",
            //                         "age":41,
            //                         "gender":"male"
            //                     },{
            //                         "name":"abc",
            //                         "age":41,
            //                         "gender":"female"
            //                     }]
            //                 })
            //                 .then(response=>{
            //                     console.log(response.statusCode);
            // expect(response.statusCode).to.be.equal(200)
            //                 }).catch(error=>{
            //                     console.error(error);
            //                 })
        })
    })

})
// import { chai} from "chai";
// import chaiHttp from "chai-http";
// import  {app} from '../server.js'
// const assert = chai.assert();
// assert.should();

// assert.use(chaiHttp);

import supertest from "supertest";
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from "chai";
const baseUrl = "http://localhost:4040/api/v1";
const request = supertest(baseUrl);
var auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwNjdmZDc0MjFkZGVjODdkMzA1ZGEiLCJpYXQiOjE3MTAyMjQwODYsImV4cCI6MTcxMDMxMDQ4Nn0.fCYdA5YREj7gpokrs0isBWLX0dRuGoktyoy6mW_y564";
var refreshToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwNjdmZDc0MjFkZGVjODdkMzA1ZGEiLCJpYXQiOjE3MTAyMjQwMjYsImV4cCI6MTcxMDgyODgyNn0.RsXnwo4ZAo_zM4rwXb_6cFAoxIzSCpoLrNk2qrJtV10";
describe("Tasks API", () => {
  describe("POST /", () => {
    // it("User Registration", async () => {
    //    const response = await request
    //         .post('/user/register') // Relative to the base URL
    //         .set('content-type','application/json')
    //         .send({
    //             firstName:"avish",
                    // lastName:"shiroya",
    //             email:"avish@gmail.com",
                //    callingCode:91,
    //             mobile:"9874563210",
    //             DOB:'2004-01-30',
    //             address:"abc abdbdd",
    //             pincode:'458525',
    //             city:'surat',
    //             state:'gujarat',
    //             country:'india'
    //         })
    //         .then(response => {
    //             console.log(response.statusCode);// Output the response body
    //         // expect(response.statusCode).to.be.equal(200)
    //         })
    //         .catch(error => {
    //             console.error(error); // Log any errors
    //         });
    // })
  });
  describe("POST /sendmailToLogin", () => {
    it("Send OTp FOr Login", async () => {
      //    const response =  request
      //         .post('/user/sendMailToLogin') // Relative to the base URL
      //         .set('content-type','application/json')
      //         .send({
      //             user:'9601458205'
      //         })
      //         .then(response => {
      //             console.log(response.body);
    //   expect(response.statusCode).to.be.equal(200);
      //             return response;// Output the response body
      //         })
      //         .catch(error => {
      //             console.error(error); // Log any errors
      // });
      //         // expect(response.statusCode).to.be.equal(200)
      // const sendOTP = await request
      //     .post('/user/login')
      //     .set('content-type','application/json')
      //     .send({
      //         user:'9601458205',
      //         otp:3663
      //     })
      //     .then(response => {
      //        console.log( response.body);
      //         // console.log(auth);
      //         // Output the response body
      //             auth=response.body.token
      //             refreshToken=response.body.refreshToken
    //   expect(response.statusCode).to.be.equal(200)

      //     })
      //     .catch(error => {
      //         console.error(error); // Log any errors
      //     });
    });
  });
  describe("GET /details", () => {
    it("GET THE USER DETAILS", async () => {
      const response = await request
        .get("/user/detail")
        .set("auth", auth)
        .then((response) => {
          console.log(response.statusCode);
          console.log(refreshToken);
          expect(response.statusCode).to.be.equal(200)
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  describe("PUT /update-detail", () => {
    it("UPDATE THE USER DETAILS", async () => {
      const response = await request
        .put("/user/update-detail")
        .set("content-type", "application/json")
        .set("auth", auth)
        .send({
          name: "avish",
        })
        .then((response) => {
          console.log(response.statusCode);
          expect(response.statusCode).to.be.equal(200)
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  describe("GET /logout", () => {
    //     it("LOGOUT THE USER",async()=>{
    //         const response = request.get('/user/logout')
    // .set('auth',auth)
    //                         .then(response=>{
    //                             console.log(response.statusCode);
    // expect(response.statusCode).to.be.equal(200)
    //                         }).catch(error=>{
    //                             console.error(error);
    //                         })
    //     })
  });
  describe("DELETE /delete-user", () => {
    it("DELETE THE USER", async () => {
      // const response = request.delete('/user/delete-user')
      // .set('auth',auth)
      //                 .then(response=>{
      //                     console.log(response.statusCode);
    //   expect(response.statusCode).to.be.equal(200)
      //                 }).catch(error=>{
      //                     console.error(error);
      //                 })
    });
  });
  describe("GET /orders", () => {
    it("ORDERS OF USER", async () => {
      const response = await request
        .get("/user/orders")
        .set("auth", auth)
        // .send({
        //     auth:auth
        // })
        .then((response) => {
          console.log(response.statusCode);
          expect(response.statusCode).to.be.equal(200)
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  describe("GET /refresh", () => {
    it("GET New Access TOken", async () => {
      const response = await request
        .get("/user/refresh")
        .set("auth", auth)
        .set("Cookie", "auth=" + refreshToken)
        // .send({
        //     auth:auth
        // })
        .then((response) => {
          console.log(response.body);
          expect(response.statusCode).to.be.equal(200)
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
});

import supertest from "supertest";
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from "chai";

const baseUrl = "http://localhost:4040/api/v1/theater";
const request = supertest(baseUrl);
var cookie =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms";

describe("THEATER API", () => {
  describe("POST /", () => {
    it("ADD THEATER", async () => {
      // const response = await request.post("/")
      //                 .set("Cookie",'aAuth='+cookie)
      //                 .send({
      //                     "name":" Brothers",
      //                     "location":"andhernagari,shaitan chauraya , kholi no:420",
      //                     "capacity":1000,
      //                     "totalScreens":5
      //                 })
      //                 .then(response=>{
      //                     console.log(response.statusCode);
      // expect(response.statusCode).to.be.equal(200)
      //                 })
      //                 .catch(error=>{
      //                     console.error(error);
      //                 })
    });
  });
  describe("GET /", () => {
    it("GET THEATER", async () => {
      const response = await request
        .get("/")
        .set("Cookie", "aAuth=" + cookie)
        .then((response) => {
          console.log(response.statusCode);
          expect(response.statusCode).to.be.equal(200);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  describe("GET /name", () => {
    it("GET THEATER BY NAME", async () => {
      const response = await request
        .get("/name")
        .set("Cookie", "aAuth=" + cookie)
        .send({
          name: "City Brothers",
        })
        .then((response) => {
          console.log(response.statusCode);
          expect(response.statusCode).to.be.equal(200);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  describe("PUT /:id", () => {
    it("UPDATE THEATER", async () => {
      const response = await request
        .put("/65e1c7d23f307d4e5b51b024")
        .set("Cookie", "aAuth=" + cookie)
        .send({
          capacity: 500,
        })
        .then((response) => {
          console.log(response.statusCode);
          expect(response.statusCode).to.be.equal(200);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  describe("DELETE /:id", () => {
    it("DELETE THEATER", async () => {
      // const response = await request.delete("/65f036de0be81dc7665e5c78")
      //                 .set("Cookie",'aAuth='+cookie)
      //                 .then(response=>{
      //                     console.log(response.statusCode);
      // expect(response.statusCode).to.be.equal(200)
      //                 })
      //                 .catch(error=>{
      //                     console.error(error);
      //                 })
    });
  });
});

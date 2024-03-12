import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/movie';
const request = supertest(baseUrl);
var cookie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTAyMjY3NDMsImV4cCI6MTcxMDgzMTU0M30.ey2pmQINgdckQIBQd8P8w3GEx2oS4GMfEnFCnBoUhms';

describe("MOVIE API", () => {
    describe("POST /add", () => {
        it("add the movie", async () => {
            const response = await request.post("/add")
                .set('Cookie', 'aAuth=' + cookie)
                .send({
                    "category": "movie",
                    "title": "HHH",
                    "genre": "Crime",
                    "releaseYear": "1972",
                    "IMDB_rating": 9.2,
                    "duration": "175 min",
                    "casts": ["Marlon Brando", "Al Pacino", "James Caan "]
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
            it("add the movie", async () => {
                const response = await request.put("/65e16bb2a7b36ed6e300e6ff")
                    .set('Cookie', 'aAuth=' + cookie)
                    .send({
                        "title": "The Thomas",
                    })
                    .then(response => {
                        console.log(response.statusCode);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
        })
        describe("GET /", () => {
            it("add the movie", async () => {
                const response = await request.get("/")
                    .then(response => {
                        console.log(response.statusCode);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
        })
        describe("GET /genre/:type",()=>{
            it("GET Movie by genre type",async()=>{
                const response = await request.get('/genre/crime')
                .then(response=>{
                    console.log(response.statusCode);
                })
                .catch(error=>{
                    console.error(error);
                })
            })
        })
        describe("GET /casts/:name",()=>{
            it("GET Movie by Casts type",async()=>{
                const response = await request.get('/casts/Marlon Brando')
                .then(response=>{
                    console.log(response.statusCode);
                })
                .catch(error=>{
                    console.error(error);
                })
            })
        })
        describe("DELETE /:id", () => {
            it("Delete the movie", async () => {
                const response = await request.delete("/65f024e3259240a9dfec9a4a")
                    .set('Cookie', 'aAuth=' + cookie)
                    .then(response=>{
                        console.log(response.statusCode);
                    })
                    .catch(error=>{
                        console.error(error);
                    })
            })
            })
    })
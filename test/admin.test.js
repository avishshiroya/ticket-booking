import supertest from 'supertest';
import { expect } from "chai";
// import addContext from "mochawesome/addContext"
import { util } from 'chai';

const baseUrl = 'http://localhost:4040/api/v1/admin';
const request = supertest(baseUrl);
var cookie = '';
describe('Admin API',()=>{
    describe("POST /register",()=>{
        it("Admin Registration",async()=>{
            // const response = await request
                // .post('/register')
                // .set('content-type','application/json')
                // .send({
                //     'email':"admin@gmail.com",
                //     'password':"admin123"
                // }).then(response=>{
                //     console.log(response.statusCode);
                // }).catch(error=>{
                //     console.error(error);
                // })
            })
    })
    describe("POST /login",()=>{
        it("Admin Login",async()=>{
            const response = await request  
                        .post('/login')
                        .set('content-type','application/json')
                        .send({
                           email:'admin@admin.com',
                           password:'123456789'
                        }).then(response=>{
                            console.log(response.statusCode);
                            cookie ='Bearer '+ response.body.token
                            console.log(cookie);
                        }).catch(error=>{
                            console.error(error);
                        })
        })
        })
    describe("GET /",()=>{
        it("Admin Details",async()=>{
            const response = await request  
                            .get('/')
                            .set('Cookie','aAuth='+cookie)
                            .then(response=>{
                                console.log(response.statusCode);
                            }).catch(error=>{
                                console.error(error);
                            })
        })
    })
    describe("GET /logout",()=>{
        it("Admin Logout",async()=>{
        //     const response = await request
        //                     .get('/logout')
        //                     .set('Cookie','aAuth=Bearer '+cookie)
        //                     .then(response=>{
        //                         // console.log(cookie);
        //                         console.log(response.statusCode);;
        //                         cookie = ''
        //                         // console.log(cookie);
        //                     }).catch(error=>{
        //                         console.error(error);
        //                     })
        })
    })
})


const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const app = require('../app')
const model = require('../models/usersModel')
const {connect, disconnect} = require('../database/mongoDB')

const testobjektet = {
    id: "",
    token: ""
}

describe('Authorization', () => { 

    before(async function(){

        await connect();
    })
    
    beforeEach(async function(){


        const testUser = await model.createUserModel({

            email: 'testkillen',
            password: '123'

        })
        testobjektet.token = await model.loginUserModel({email: testUser.email, password: '123'})
        testobjektet.id = testUser._id
    });
    
    it('Should deny access (lacking authorization)', async function() {
        const input = {listName: 'MyFirstList', userID: testobjektet.id}
        
        expect(input.userID).to.be.string
        
        await request(app)
            .post('/todoLists')
            .send(input)
            .then((res) => {
                expect(res).to.have.status(403)
                })
                
    });

    it('Should give access (get todos)', async function() {
        
        await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${testobjektet.token}`)
            .then((res) => {
                expect(res).to.have.status(200)
                })
                
    });

    it('Should give access (create todo)', async function() {
        const input = {title: 'laga mat'}

        await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${testobjektet.token}`)
            .set('Content-Type', 'application/json')
            .send(input)
            .then((res) => {
                expect(res).to.have.status(201)
                })
                

                
    });

    after(async function(){

        await disconnect();

    })

}); 
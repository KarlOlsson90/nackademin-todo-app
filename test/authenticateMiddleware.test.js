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
    
    it('Should deny access (lacking authorization)', function() {
        const input = {listName: 'MyFirstList', userID: testobjektet.id}
        
        expect(input.userID).to.be.string
        
        request(app)
            .post('/todoLists')
            .send(input)
            .end((err,res) => {
                expect(res).to.have.status(403)
                })
                
    });

    it('Should accept request (has authorization)', function() {
        const input = {listName: 'MyFirstList', userID: testobjektet.id}
        
        request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${testobjektet.token}`)
            .send(input)
            .end((err,res) => {
                expect(res).to.have.status(201)
            })
                
    });


}); 
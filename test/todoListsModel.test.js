const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const app = require('../app')
const {todoListsCollection: db} = require('../database/database');
const model = require('../models/usersModel')
const testobjektet = {
    token: ""
}

describe('Create Todo List', () => { 
    
    beforeEach(async function(){
        console.log("beforeEach körs")
        
        const testUser = await model.createUserModel({

            email: 'testkillen',
            password: '123'

        })

        testobjektet.token = await model.loginUserModel({email: testUser.email, password: '123'})

    });

    it('should create the list', function() {
        const input = {listName: 'MyFirstList'}

        

    });

    



}); 
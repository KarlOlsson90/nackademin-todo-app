const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const app = require('../app')
const {usersCollection: db, todosCollection: todoDb} = require('../database/database');
const model = require('../models/usersModel')

const testobjektet = {
    id: "",
    token: ""
}

describe('Authorization', () => { 
    
    beforeEach(async function(){
        clearDatabase()
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
        expect(input.userID.length).to.be.equal(16)
        
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

    clearTodoDatabase();

}); 


async function clearDatabase(){
    
    await db.remove({}, { multi: true }, function (err, numRemoved) {

    });

}

async function clearTodoDatabase(){

    await todoDb.remove({}, { multi: true }, function (err, numRemoved) {

    });
}
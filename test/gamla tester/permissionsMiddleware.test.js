const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const app = require('../app')
const {usersCollection: db, todosCollection: todoDb, usersCollection} = require('../database/database');
const usersModel = require('../models/usersModel')
const todosModel = require('../models/todosModel')
const decode = require('jwt-decode')

var testobjektet = {
    id: "",
    token: ""
}

describe('Admin permission', function () { 
    
    beforeEach(async function(){
        clearDatabase()

        this.testTodo = await todosModel.createTodoModel({createdBy: "noCreator"})
        
        const testUser = await usersModel.createUserModel({

            email: 'testkillen',
            password: '123'

        })
        await db.update({ _id: testUser._id}, {$set: {role: 'admin'}},{})
        
        testobjektet.token = await usersModel.loginUserModel({email: testUser.email, password: '123'})
        testobjektet.id = testUser._id
    });
    it('Test Todo should have no creator', function() {
        expect(this.testTodo.createdBy).to.equal('noCreator')
    });
    it('Token should include admin role', function() {
        var decodedToken = decode(testobjektet.token)
        expect(decodedToken['role']).to.equal('admin')
    });
    it('Admin should be able to delete test todo even if not creator', function() {

        request(app)
        .delete(`/todos/${this.testTodo._id}`)
        .set('Authorization', `Bearer ${testobjektet.token}`)
        .end((err,res) => {
            expect(res).to.have.status(201)
        })
    });

}); 


async function clearDatabase(){
    
    await db.remove({}, { multi: true }, function (err, numRemoved) {

    });

}

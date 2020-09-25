const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const app = require('../app')
const usersModel = require('../models/usersModel')
const todoListsModel = require('../models/todoListsModel')
const decode = require('jwt-decode')
const {connect, disconnect} = require('../database/mongoDB')
var testobjektet = {
    id: "",
    token: ""
}

const mongoose = require('mongoose')
const userDB = mongoose.model("users")
const todolistDB = mongoose.model("todolists")

describe('Admin permission (todo lists)', function () { 

    before(async function(){

        await connect();
    })

    beforeEach(async function(){
        clearDatabase()

        this.testTodoList = await todoListsModel.createTodoListModel({title: "testlistan", createdBy: "noCreator"})

        this.testUser = await usersModel.createUserModel({

            email: 'testkillen',
            password: '123'

        })
        
        testobjektet.token = await usersModel.loginUserModel({email: this.testUser.email, password: '123'})
        testobjektet.id = this.testUser._id
    });
    it('Test Todolist should have no creator', function() {
        expect(this.testTodoList.createdBy).to.equal('noCreator')
    });
    it('Token should include user role', function() {
        var decodedToken = decode(testobjektet.token)
        expect(decodedToken['role']).to.equal('user')
    });
    it('Admin should be able to get all todolists even if not creator', async function() {
        await userDB.updateOne({ _id: this.testUser._id}, {$set: {role: 'admin'}},{})
        testobjektet.token = await usersModel.loginUserModel({email: this.testUser.email, password: '123'})

        var decodedToken = decode(testobjektet.token)

        expect(decodedToken['role']).to.equal('admin')

        await todoListsModel.createTodoListModel({title: "testlistan", createdBy: "noCreator"})
        await todoListsModel.createTodoListModel({title: "testlistan2", createdBy: "noCreator"})
        await todoListsModel.createTodoListModel({title: "testlistan3", createdBy: "noCreator"})

        await request(app)
        .get(`/todoLists/`)
        .set('Authorization', `Bearer ${testobjektet.token}`)
        .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body.length).to.equal(3)
            })
    });
    it('User should get its own todoLists if not admin', async function() {
        
        await todoListsModel.createTodoListModel({title: "testlistan", createdBy: "noCreator"})
        await todoListsModel.createTodoListModel({title: "testlistan2", createdBy: "noCreator"})
        await todoListsModel.createTodoListModel({title: "testlistan3", createdBy: this.testUser._id})
        await todoListsModel.createTodoListModel({title: "testlistan4", createdBy: this.testUser._id})
        
        await request(app)
        .get(`/todoLists/`)
        .set('Authorization', `Bearer ${testobjektet.token}`)
        .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body.length).to.equal(2)
            })
    });

    after(async function(){

        await disconnect();

    })
}); 


async function clearDatabase(){
    
    await userDB.deleteMany({});
    await todolistDB.deleteMany({});
}

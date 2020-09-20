const chai = require('chai')
const {expect} = chai
const {todoListsCollection: db} = require('../database/database');
const model = require('../models/todoListsModel');
const {connect, disconnect} = require('../database/mongoDB')
const mongoose = require('mongoose')
const todoDB = mongoose.model("todolists")

var todoList1 = ""
var todoList2 = ""
var todoList3 = ""

describe('Todo List Creation', () => { 

    before(async function(){

        await connect();
    })

    beforeEach( async () => {
        await clearDatabase()
    })

    it('Todo List should be created in database', async function() {

        this.todoList1 = await model.createTodoListModel({title: 'testLista1'})
        this.todoList2 = await model.createTodoListModel({title: 'testLista2'})
    
        var content = await todoDB.find({})
        expect(content.length).to.equal(2)

    });
    it('Created list should be object with createdBy, timestamp, title and _id attr.', async function() {

        expect(this.todoList1.createdBy).to.exist
        expect(this.todoList1.createdTime).to.exist
        expect(typeof this.todoList1).to.equal('object');

    });

    after(async function(){

        await disconnect();

    })
}); 

describe('Get Todo Lists', () => { 

    before(async function(){

        await connect();
    })

    beforeEach( async () => {
        await clearDatabase()
        this.todoList1 = await model.createTodoListModel({title: 'testLista1'})
        this.todoList2 = await model.createTodoListModel({title: 'testLista2'})
    })

    it('Response should be object of Todo List Objects', async function() {
        var result = await model.getAllTodoListsModel()
        expect(typeof result).to.equal('object');
        expect(result.length).to.equal(2)

    });
    it('Response should contain created posts', async function() {

        var result = await todoDB.findOne({title: 'testLista1'})
        expect(result.title).to.equal('testLista1')

    });

    after(async function(){

        await disconnect();

    })
});

describe('Get Single Todo List', () => { 

    before(async function(){

        await connect();
    })
    
    it('Response should contain object', async function() {

        this.todolist3 = await model.createTodoListModel({title: 'testLista3'})
        var result = await model.getSingleTodoListModel(this.todolist3._id)
        expect(result).to.be.an('object')
        expect(result.title).to.equal("testLista3")
        
    });
    it('Response object should have all related attributes', async function() {
        var result = await model.getSingleTodoListModel(this.todolist3._id)
        expect(result.createdBy).to.exist
        expect(result.createdTime).to.exist
        expect(result.createdBy).to.exist
        expect(result._id).to.exist


    });

    after(async function(){

        await disconnect();

    })
});

describe('Remove Todo List', () => { 

    before(async function(){

        await connect();
    })
    
    beforeEach( async () => {
        clearDatabase()
        
    })

    it('Specific Item should be removed from database', async function() {
        this.todoList1 = await model.createTodoListModel({title: 'testLista1'})

        var result = await model.removeTodoListModel(this.todoList1._id)
        expect(result.deletedCount).to.equal(1)

    });

    after(async function(){

        await disconnect();

    })
}); 

describe('Edit Todo List', () => { 

    before(async function(){

        await connect();
    })
    
    beforeEach( () => {
        clearDatabase()
        
    })
    /*
    it('Edited item should be returned', async function() {

        var testTodo = await model.createTodoListModel({title: 'testListan'})
        var testTodo = await model.getAllTodoListsModel()
        var result = await model.editTodoListModel(testTodo._id, {title: 'nytt namn'})

    });
    */
    after(async function(){

        await disconnect();

    })
}); 

async function clearDatabase(){
    
    await todoDB.deleteMany({});

}
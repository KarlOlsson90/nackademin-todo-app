const chai = require('chai')
const {expect} = chai
const app = require('../app')
const {todoListsCollection: db} = require('../database/database');
const model = require('../models/todoListsModel');
const { hasUncaughtExceptionCaptureCallback } = require('process');

var todoList1 = ""
var todoList2 = ""
var todoList3 = ""

describe('Todo List Creation', () => { 
    beforeEach( async () => {
        await db.remove({})

    })

    it('Posts should be created in database', async function() {

        this.todoList1 = await model.createTodoListModel({title: 'testLista1'})
        this.todoList2 = await model.createTodoListModel({title: 'testLista2'})

        var content = await db.find({})
        expect(content.length).to.equal(2)

    });
    it('Created post should be object with createdBy, timestamp, title and _id attr.', async function() {

        expect(this.todoList1).to.have.own.property('createdBy')
        expect(this.todoList1).to.have.own.property('createdTime')
        expect(typeof this.todoList1).to.equal('object');
        
    });

}); 

describe('Get Todo Lists', () => { 
    beforeEach( async () => {
        await db.remove({})
        this.todoList1 = await model.createTodoListModel({title: 'testLista1'})
        this.todoList2 = await model.createTodoListModel({title: 'testLista2'})

    })

    it('Response should be object of Todo List Objects', async function() {
        var result = await model.getAllTodoListsModel()
        expect(typeof result).to.equal('object');
        expect(result.length).to.equal(2)
        console.log(result)
    });
    it('Response should contain created posts', async function() {

        var result = await db.find({title: 'testLista1'})
        expect(result[0].title).to.equal('testLista1')

    });

});

describe('Get Single Todo List', () => { 

    it('Response should contain single post', async function() {
        this.todolist3 = await model.createTodoListModel({title: 'testLista3'})
        var result = await model.getSingleTodoListModel(this.todolist3._id)

    });
    it('Response should contain object', async function() {
        var result = await model.getSingleTodoListModel(this.todolist3._id)
        expect(result).to.be.an('object')
        
    });
    it('Response object should have all related attributes', async function() {
        var result = await model.getSingleTodoListModel(this.todolist3._id)
        var expectedRes = ['title', 'createdTime', 'createdBy', '_id']
        
        expect(Object.keys(result).toString()).to.equal(expectedRes.toString())

    });

});

describe('Clear Todo Lists', () => { 

    it('Database should be cleared', async function() {
       await model.clearTodoListsModel()

       var content = await db.find({})
       expect(content.length).to.equal(0)

    });

}); 

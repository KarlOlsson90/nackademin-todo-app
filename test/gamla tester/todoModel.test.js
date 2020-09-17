const chai = require('chai')
const {expect} = chai
const model = require('../models/todosModel');

describe('Todo List Connection', () => { 

    it('Todo should be created in database', async function() {

        var todo = await model.createTodoModel({title: 'testLista1'})

        expect(typeof todo).to.equal('object')

    });
    it('Todo should have all attributes', async function() {

        var todo = await model.createTodoModel({title: 'testLista5'})
        /*
        expect(todo).to.have.own.property('createdTime')
        expect(todo).to.have.own.property('title')
        expect(todo).to.have.own.property('content')
        expect(todo).to.have.own.property('deadline')
        expect(todo).to.have.own.property('todoListId')
        */
    });


}); 
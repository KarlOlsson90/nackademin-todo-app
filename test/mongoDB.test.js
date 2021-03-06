const db = require('../database/mongoDB')
const chai = require('chai')
const {expect, request} = chai
const mongoose = require('mongoose')
const {connect, disconnect} = require('../database/mongoDB')
describe("Database Connection", () => {

    it('Should connect to test database', async function() {

        var connection = await db.connect()
        expect(connection.success).to.equal("Connected to database")

    });
    after(async function(){

        await disconnect();
    })

})
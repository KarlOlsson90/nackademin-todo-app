const model = require('../models/model')
const { addListener } = require('process')

module.exports = {  
    putCallback: (req, res) => {

    const id = req.params.id
    const body = {title: req.body.title, content: req.body.content}

    model.updateTodo(id, body)
    res.json(req.body.title + " ändrades!")

}, postCallback: (req, res) => {
    const body = {title: req.body.title, content: req.body.content, deadline: req.body.deadline}

    model.createTodo(body)
    res.json(req.body.title + " Lades till!")

}, deleteCallback: async (req, res) => { 
    try {
        const id = req.params.id
        model.deleteTodo(id)
        res.json("Det gick bra")
    } catch(error) {
        res.json("NEJ")
    }

}, getCallback: async (req, res) => {
    try {
        result = await model.getAllTodos()
        res.json(result)
    } catch(error) {
        res.json("Error")
    }
    
}

}


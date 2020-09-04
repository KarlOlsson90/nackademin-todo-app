

async function createTodoListController(req, res){
    try {
        const body = {title: req.body.title}
        var result = await model.createTodoListModel(body)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    createTodoListController
}
const model = require('../models/complianceModel');

async function getAllUserDataController(req, res){
    try {
        var id = req.params.id
        var result = await model.getAllUserDataModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}

async function clearUserDataController(req, res){
    try {
        var id = req.params.id
        var result = await model.clearUserDataModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}

module.exports = {
    getAllUserDataController,
    clearUserDataController


}
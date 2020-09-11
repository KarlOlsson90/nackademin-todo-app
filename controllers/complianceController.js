const model = require('../models/complianceModel');
const {isAdmin, isCreator, isCreatorOrAdmin, isUser} = require('../middlewares/permissionsMiddleware')

async function getAllUserDataController(req, res){
    try {
        var id = req.params.id
        var pass = await isUser(id, req.user)
        if(!pass){
            return res.status(403).json("Not authorized to perform action")
        }
        var result = await model.getAllUserDataModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
        }
}

async function clearUserDataController(req, res){
    try {
        var id = req.params.id
        var pass1 = await isUser(id, req.user)
        var pass2 = await isAdmin(req.user.role)
        if(!pass1 && !pass2){
            return res.status(403).json("Not authorized to perform action")
        }
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
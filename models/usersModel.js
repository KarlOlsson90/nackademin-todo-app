
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    email: String,
    password: String,
    created: String,
    role: String
})

const userDB = mongoose.model("users", usersSchema)

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getAllUsersModel() {
    
    const result = await userDB.find({})
    return result
}
async function getSingleUserModel(id) {
    
    const result = await userDB.findOne({ _id: id })
    return result

}
async function createUserModel(body) {
    body['password'] = bcrypt.hashSync(body.password, 10)
    body['createdTime'] = currentDate()
    body['role'] = 'user'
    const result = await userDB.create(body)
    return result
}
async function editUserModel(id, body) {
    
    //const result = await db.update({ _id: id}, {$set: {email: body.email, password: body.password}},{})
    //return result
}
async function deleteUserModel(id) {
    
    const result = await userDB.remove({ _id: id})
    return result
}
async function loginUserModel(body){
    const user = await userDB.findOne({email: body.email});

    if (user){
        if (comparePass(body, user)) {
            
            
            const token = jwt.sign({email: body.email, role: user.role, userId: user._id}, process.env.SECRET, {expiresIn: 10000000,})
            
            return token
        }
    }
}
async function verifyTokenModel(token, secret){
    const validatedToken = jwt.verify(token, secret)
    return validatedToken;
}
function comparePass(body, user){
    const tryPassword = bcrypt.compareSync(body.password, user.password)
    return tryPassword
}
function currentDate(){
    var datum = new Date();
    return datum.getTime()
}

/*------------------------------------
TESTER
------------------------------------*/

module.exports = {
    getAllUsersModel,
    getSingleUserModel,
    createUserModel,
    editUserModel,
    deleteUserModel,
    loginUserModel,
    verifyTokenModel
}
console.log("models/UsersModel.js")
const {usersCollection: db} = require('../database/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log(process.env.SECRET)

async function getAllUsersModel() {
    console.log("getAllUsers initiated;")
    const result = await db.find({})
    return result
}
async function getSingleUserModel(id) {
    console.log("getSingleUser initiated;")
    const result = await db.findOne({ _id: id })
    return result
}
async function createUserModel(body) {
    body['password'] = bcrypt.hashSync(body.password, 10)
    body['createdTime'] = currentDate()
    body['role'] = 'user'
    const result = await db.insert(body, function(err, newDoc){})
    return result
}
async function editUserModel(id, body) {
    console.log("updateUser initiated;")
    //const result = await db.update({ _id: id}, {$set: {email: body.email, password: body.password}},{})
    //return result
}
async function deleteUserModel(id) {
    console.log("deleteUser initiated;")

    const result = await db.remove({ _id: id}, {}, function(err, numRemoved){})
    return result
}
async function loginUserModel(body){
    const user = await db.findOne({email: body.email});
    
    if (user){
        if (comparePass(body, user)) {
            console.log("inne i loopen")
            console.log(user.role)
            const token = jwt.sign({email: body.email, role: user.role}, process.env.SECRET, {expiresIn: 10000000,})
            console.log(token)
            return token
        }
    }
}
async function verifyTokenModel(token, secret){
    const validatedToken = await jwt.verify(token, secret)
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

module.exports = {
    getAllUsersModel,
    getSingleUserModel,
    createUserModel,
    editUserModel,
    deleteUserModel,
    loginUserModel,
    verifyTokenModel
}
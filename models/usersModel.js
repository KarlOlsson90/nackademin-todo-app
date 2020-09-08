
const {usersCollection: db} = require('../database/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function getAllUsersModel() {

    const result = await db.find({})
    return result
}
async function getSingleUserModel(id) {

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

    //const result = await db.update({ _id: id}, {$set: {email: body.email, password: body.password}},{})
    //return result
}
async function deleteUserModel(id) {


    const result = await db.remove({ _id: id}, {}, function(err, numRemoved){})
    return result
}
async function loginUserModel(body){
    const user = await db.findOne({email: body.email});

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

module.exports = {
    getAllUsersModel,
    getSingleUserModel,
    createUserModel,
    editUserModel,
    deleteUserModel,
    loginUserModel,
    verifyTokenModel
}
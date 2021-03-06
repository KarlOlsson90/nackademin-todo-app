const model = require("../models/usersModel");

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(403);
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = await model.verifyTokenModel(token, process.env.SECRET);
    
    req.user = payload;

    next();
  } catch (e) {
    res.sendStatus(403);
  }
};

module.exports = { authenticate };

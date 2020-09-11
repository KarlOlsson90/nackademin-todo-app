const express = require("express");
const controller = require('../controllers/complianceController');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticateMiddleware");

router.get('/:id', authenticate, controller.getAllUserDataController)
router.delete('/:id', authenticate, controller.clearUserDataController)
module.exports = router
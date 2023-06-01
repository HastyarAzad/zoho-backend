// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const login_controller = require('../controllers/login_controller');

// get all login api
router.get("/login/:email/:password", login_controller.login);

// exporting the router
module.exports = router;
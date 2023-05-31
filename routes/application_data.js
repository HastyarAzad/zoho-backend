// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const application_data_controller = require('../controllers/application_data_controller');

// get all application_data api
router.get("/application_datas", application_data_controller.getAll);

// get a application_data by id api
router.get("/application_data/:id", application_data_controller.getById);

// insert a application_data into the database
router.post("/application_data", application_data_controller.createOne);

// update a application_data based on it's id 
router.put("/application_data/:id", application_data_controller.updateByID);

// //delete a application_data based on it's id
// router.delete("/application_data/:id", application_data_controller.deleteByID); 

// exporting the router
module.exports = router;
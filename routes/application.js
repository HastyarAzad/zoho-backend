// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const application_controller = require('../controllers/application_controller');

// get all application api
router.get("/applications", application_controller.getAll);

// get a application by id api
router.get("/application/:id", application_controller.getById);

// get a application by company_id api
router.get("/applications_for_company/:id", application_controller.getByCompanyId);

// get a application by job_id api
router.get("/applications_for_job/:id", application_controller.getByJobId);

// insert a application into the database
router.post("/application", application_controller.createOne);

// update a application based on it's id 
router.put("/application/:id", application_controller.updateByID);

// //delete a application based on it's id
// router.delete("/application/:id", application_controller.deleteByID); 

// exporting the router
module.exports = router;
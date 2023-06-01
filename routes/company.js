// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const company_controller = require('../controllers/company_controller');

// get all company api
router.get("/companies", company_controller.getAll);

// get a company by id api
router.get("/company/:id", company_controller.getById);

// get a company by email api
router.get("/company_by_email/:email", company_controller.getByEmail);

// insert a company into the database
router.post("/company", company_controller.createOne);

// update a company based on it's id 
router.put("/company/:id", company_controller.updateByID);

// //delete a company based on it's id
// router.delete("/company/:id", company_controller.deleteByID); 

// exporting the router
module.exports = router;
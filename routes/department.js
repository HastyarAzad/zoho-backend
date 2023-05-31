// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const department_controller = require('../controllers/department_controller');

// get all department api
router.get("/departments", department_controller.getAll);

// get a department by id api
router.get("/department/:id", department_controller.getById);

// insert a department into the database
router.post("/department", department_controller.createOne);

// update a department based on it's id 
router.put("/department/:id", department_controller.updateByID);

// //delete a department based on it's id
// router.delete("/department/:id", department_controller.deleteByID); 

// exporting the router
module.exports = router;
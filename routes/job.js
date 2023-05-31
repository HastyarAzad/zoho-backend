// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const job_controller = require('../controllers/job_controller');

// get all job api
router.get("/jobs", job_controller.getAll);

// get a job by id api
router.get("/job/:id", job_controller.getById);

// insert a job into the database
router.post("/job", job_controller.createOne);

// update a job based on it's id 
router.put("/job/:id", job_controller.updateByID);

// //delete a job based on it's id
// router.delete("/job/:id", job_controller.deleteByID); 

// exporting the router
module.exports = router;
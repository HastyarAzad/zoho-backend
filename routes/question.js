// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const question_controller = require('../controllers/question_controller');

// get all question api
router.get("/questions", question_controller.getAll);

// get a question by id api
router.get("/question/:id", question_controller.getById);

// get a question by job id api
router.get("/questions_for_job/:id", question_controller.getByJobId);

// insert a question into the database
router.post("/question", question_controller.createOne);

// update a question based on it's id 
router.put("/question/:id", question_controller.updateByID);

// //delete a question based on it's id
// router.delete("/question/:id", question_controller.deleteByID); 

// exporting the router
module.exports = router;
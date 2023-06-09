// importing Express and attaching a router
const express = require("express");
const router = express.Router();
const student_controller = require('../controllers/student_controller');

// get all student api
router.get("/students", student_controller.getAll);

// get a student by id api
router.get("/student/:id", student_controller.getById);

// get a student by id api
router.get("/student_by_email/:email", student_controller.getByEmail);

// get students by ids api
router.post("/students_by_ids", student_controller.getByIds);

// insert a student into the database
router.post("/student", student_controller.createOne);

// update a student based on it's id 
router.put("/student/:id", student_controller.updateByID);

// //delete a student based on it's id
// router.delete("/student/:id", student_controller.deleteByID); 

// exporting the router
module.exports = router;

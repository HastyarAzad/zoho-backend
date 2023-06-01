const validate_student = require("../validation/student.validation");
const student_module = require("../modules/student_module");


// get all student api
exports.getAll = async (req, res) => {

  const result = await student_module.getAll();

  // console.log(result);
  res.send(result);

};

// get a student by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_student.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the student inside the database
  const result = await student_module.getById(id);
  console.log(result);

  res.send(result);
};

// get a student by email api
exports.getByEmail = async (req, res) => {
  const email = req.params.email;

  // validate if email is correct
  const {error} = validate_student.validate_user_email(email);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // check if email exists in the database
  const result = await student_module.getByEmail(email);
  console.log(result);

  // check the result and send the response
  if (result.length === 0) {
    res.status(404).send({error: "student not found"});
    return;
  }

  res.send({message: "student found"});
};


// insert a student into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const {error, value} = validate_student.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const student = value;
  // console.log(student);

  // insert the student into the database
  const result = await student_module.createOne(student);

  console.log(`student created with id: ${result.insertId}`);
  res.send(result);
};

// update a student based on it's id 
exports.updateByID = async(req, res) => {

  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_student.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_student.validate_user_id(req.params.id);

  // console.log(req.params.id);

  //check if error exists
  if (result1.error) {
    console.log(result1.error.details[0].message);
    res.status(404).send(result1.error.details[0].message);
    return;
  }
  
  if (result2.error) {
    console.log(result2.error.details[0].message);
    res.status(404).send(result2.details[0].message);
    return;
  }

  const student = result1.value;
  
  // update the user inside the database
  const result = await student_module.updateByID(id,student);
  console.log(`student updated with id: ${id}`);
  res.send(result);

};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_student.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the student inside the database
//   const result = await student_module.deleteByID(id);
//   console.log(`student deleted with id: ${id}`);
//   res.send(result);

// };


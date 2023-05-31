const validate_question = require("../validation/question.validation");
const question_module = require("../modules/question_module");


// get all question api
exports.getAll = async (req, res) => {

  const result = await question_module.getAll();

  // console.log(result);
  res.send(result);

};

// get a question by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_question.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the question inside the database
  const result = await question_module.getById(id);
  // console.log(result);
  console.log(`returned question with id: ${id}`)

  res.send(result);
};

// insert a question into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const {error, value} = validate_question.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const question = value;
  // console.log(question);

  // insert the question into the database
  const result = await question_module.createOne(question);

  console.log(`question created with id: ${result.insertId}`);
  res.send(result);
};

// update a question based on it's id 
exports.updateByID = async(req, res) => {

  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_question.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_question.validate_user_id(req.params.id);

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

  const question = result1.value;
  
  // update the user inside the database
  const result = await question_module.updateByID(id,question);
  console.log(`question updated with id: ${id}`);
  res.send(result);

};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_question.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the question inside the database
//   const result = await question_module.deleteByID(id);
//   console.log(`question deleted with id: ${id}`);
//   res.send(result);

// };


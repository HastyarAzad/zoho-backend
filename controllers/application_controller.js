const validate_application = require("../validation/application.validation");
const application_module = require("../modules/application_module");


// get all application api
exports.getAll = async (req, res) => {

  const result = await application_module.getAll();

  // console.log(result);
  res.send(result);

};

// get a application by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_application.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the application inside the database
  const result = await application_module.getById(id);
  // console.log(result);
  console.log(`returned application with id: ${id}`)

  res.send(result);
};

// get a application by company_id api
exports.getByCompanyId = async (req, res) => {

  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_application.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // get all the applications for that company from the database
  const result = await application_module.getByCompanyId(id);
  // console.log(result);
  console.log(`returned all applications with company_id: ${id}`)
  res.send(result);
};

// get a application by job_id api
exports.getByJobId = async (req, res) => {

  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_application.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // get all the applications for that job from the database
  const result = await application_module.getByJobId(id);
  // console.log(result);
  console.log(`returned all applications with job_id: ${id}`)
  res.send(result);
};

// insert a application into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const {error, value} = validate_application.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const application = value;
  // console.log(application);

  // insert the application into the database
  const result = await application_module.createOne(application);

  console.log(`application created with id: ${result.insertId}`);
  res.send(result);
};

// update a application based on it's id 
exports.updateByID = async(req, res) => {

  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_application.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_application.validate_user_id(req.params.id);

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

  const application = result1.value;
  
  // update the user inside the database
  const result = await application_module.updateByID(id,application);
  console.log(`application updated with id: ${id}`);
  res.send(result);

};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_application.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the application inside the database
//   const result = await application_module.deleteByID(id);
//   console.log(`application deleted with id: ${id}`);
//   res.send(result);

// };


const validate_application_data = require("../validation/application_data.validation");
const application_data_module = require("../modules/application_data_module");


// get all application_data api
exports.getAll = async (req, res) => {

  const result = await application_data_module.getAll();

  // console.log(result);
  res.send(result);

};

// get a application_data by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_application_data.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the application_data inside the database
  const result = await application_data_module.getById(id);
  // console.log(result);
  console.log(`returned application_data with id: ${id}`)

  res.send(result);
};

// insert a application_data into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const {error, value} = validate_application_data.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const application_data = value;
  // console.log(application_data);

  // insert the application_data into the database
  const result = await application_data_module.createOne(application_data);

  console.log(`application_data created with id: ${result.insertId}`);
  res.send(result);
};

// update a application_data based on it's id 
exports.updateByID = async(req, res) => {

  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_application_data.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_application_data.validate_user_id(req.params.id);

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

  const application_data = result1.value;
  
  // update the user inside the database
  const result = await application_data_module.updateByID(id,application_data);
  console.log(`application_data updated with id: ${id}`);
  res.send(result);

};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_application_data.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the application_data inside the database
//   const result = await application_data_module.deleteByID(id);
//   console.log(`application_data deleted with id: ${id}`);
//   res.send(result);

// };


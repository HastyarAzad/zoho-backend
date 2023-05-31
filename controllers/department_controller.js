const validate_department = require("../validation/department.validation");
const department_module = require("../modules/department_module");


// get all department api
exports.getAll = async (req, res) => {

  const result = await department_module.getAll();

  // console.log(result);
  res.send(result);

};

// get a department by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_department.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the department inside the database
  const result = await department_module.getById(id);
  // console.log(result);
  console.log(`returned department with id: ${id}`)

  res.send(result);
};

// insert a department into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const {error, value} = validate_department.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const department = value;
  // console.log(department);

  // insert the department into the database
  const result = await department_module.createOne(department);

  console.log(`department created with id: ${result.insertId}`);
  res.send(result);
};

// update a department based on it's id 
exports.updateByID = async(req, res) => {

  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_department.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_department.validate_user_id(req.params.id);

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

  const department = result1.value;
  
  // update the user inside the database
  const result = await department_module.updateByID(id,department);
  console.log(`department updated with id: ${id}`);
  res.send(result);

};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_department.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the department inside the database
//   const result = await department_module.deleteByID(id);
//   console.log(`department deleted with id: ${id}`);
//   res.send(result);

// };


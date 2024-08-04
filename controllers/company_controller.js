//company controller
const validate_company = require("../validation/company.validation");
const company_module = require("../modules/company_module");

// get all company api
exports.getAll = async (req, res) => {
  const result = await company_module.getAll();

  // console.log(result);
  res.send(result);
};

// get a company by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const { error } = validate_company.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the company inside the database
  const result = await company_module.getById(id);
  console.log(result);

  res.send(result);
};

// get by ids api
exports.getByIds = async (req, res) => {
  const ids = req.body.ids;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).send({ error: "Invalid ids format" });
  }

  try {
    const result = await company_module.getByIds(ids);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to retrieve companies" });
  }
};

// get a company by email api
exports.getByEmail = async (req, res) => {
  const email = req.params.email;

  // validate if email is correct
  const { error } = validate_company.validate_user_email(email);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // check if email exists in the database
  const result = await company_module.getByEmail(email);
  console.log(result);

  // if email does not exist in the database
  if (result.length === 0) {
    res.status(404).send({ error: "company not found" });
    return;
  }

  res.send({ message: "company found" });
};

// insert a company into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const { error, value } = validate_company.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const company = value;
  // console.log(company);

  // insert the company into the database
  const result = await company_module.createOne(company);

  console.log(`company created with id: ${result.insertId}`);
  res.send(result);
};

// update a company based on it's id
exports.updateByID = async (req, res) => {
  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_company.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_company.validate_user_id(req.params.id);

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

  const company = result1.value;

  // update the user inside the database
  const result = await company_module.updateByID(id, company);
  console.log(`company updated with id: ${id}`);
  res.send(result);
};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_company.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the company inside the database
//   const result = await company_module.deleteByID(id);
//   console.log(`company deleted with id: ${id}`);
//   res.send(result);

// };

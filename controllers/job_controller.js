const validate_job = require("../validation/job.validation");
const job_module = require("../modules/job_module");


// get all job api
exports.getAll = async (req, res) => {

  const result = await job_module.getAll();

  // console.log(result);
  res.send(result);

};

// get a job by id api
exports.getById = async (req, res) => {
  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_job.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // create the job inside the database
  const result = await job_module.getById(id);
  // console.log(result);
  console.log(`returned job with id: ${id}`)

  res.send(result);
};

// insert a job into the database
exports.createOne = async (req, res) => {
  // validate the req.body object
  const {error, value} = validate_job.validate_user_object(req.body);

  //check if error exists
  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  const job = value;
  // console.log(job);

  // insert the job into the database
  const result = await job_module.createOne(job);

  console.log(`job created with id: ${result.insertId}`);
  res.send(result);
};

// update a job based on it's id 
exports.updateByID = async(req, res) => {

  const id = req.params.id;

  // validate the req.body object
  const result1 = validate_job.validate_user_object(req.body);

  // validate if id is correct
  const result2 = validate_job.validate_user_id(req.params.id);

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

  const job = result1.value;
  
  // update the user inside the database
  const result = await job_module.updateByID(id,job);
  console.log(`job updated with id: ${id}`);
  res.send(result);

};

// exports.deleteByID = async (req, res) => {
//   const id = req.params.id;

//   // validate if id is correct
//   const {error} = validate_job.validate_user_id(id);

//   if (error) {
//     console.log(error.details[0].message);
//     res.status(404).send(error.details[0].message);
//     return;
//   }

//   // delete the job inside the database
//   const result = await job_module.deleteByID(id);
//   console.log(`job deleted with id: ${id}`);
//   res.send(result);

// };

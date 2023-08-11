const validate_job = require("../validation/job.validation");
const job_module = require("../modules/job_module");
const runPythonScript = require("../AI_stuff/run_script");


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

// get a job by company_id api
exports.getByCompanyId = async (req, res) => {

  const id = req.params.id;

  // validate if id is correct
  const {error} = validate_job.validate_user_id(id);

  if (error) {
    console.log(error.details[0].message);
    res.status(404).send(error.details[0].message);
    return;
  }

  // get all the jobs for that company from the database
  const result = await job_module.getByCompanyId(id);
  // console.log(result);
  console.log(`returned all jobs with company_id: ${id}`)
  res.send(result);
};

// get jobs by params
exports.getByParams = async (req, res) => {
  const params = req.query;

  // Initialize a base query
  let query = 'SELECT * FROM job';

  // Check if any parameters exist
  const keys = Object.keys(params);
  let parameters = [];
  let isFirstCondition = true;
  if (keys.length) {
    keys.forEach((key, i) => {
      // if key is equal to 0.0 or '' then skip
      if (params[key] === '0.0' || params[key] === '') return;
      
      if (!isFirstCondition) query += ' AND';  // Prepend "AND" only if it's not the first condition

      if (key === 'search') {
        // If search key is present, we'll add a LIKE clause
        query += ` (title LIKE ?`;
        query += ` OR description LIKE ?)`;
        // add '%' to the beginning and end of the search term for SQL LIKE clause
        parameters.push('%' + params[key] + '%');
        parameters.push('%' + params[key] + '%');
      } else {
        // Add condition to the query
        query += ` ${key} = ?`;
        parameters.push(params[key]);  // add the parameter to the parameters array
      }

      isFirstCondition = false;  // Update the flag to indicate that the first condition has been added
    });

    // Add WHERE clause only if there are any conditions
    if (!isFirstCondition) query = 'SELECT * FROM job WHERE ' + query.slice(18);
  }

  console.log(query);

  // send the query and parameters to the job_module
  const result = await job_module.getByParams(query, parameters);

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

  runPythonScript.runPythonScript();

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


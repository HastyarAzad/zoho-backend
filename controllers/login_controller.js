const validate_login = require("../validation/login.validation");
const student_module = require("../modules/student_module");
const company_module = require("../modules/company_module");


// validate login api
exports.login = async (req, res) => {

  const { errors, value } = validate_login.validate_login_object(req.params);

  if (errors) {
    console.log(errors);
    return res.status(400).send(errors);
  }

  const { email, password } = value;

  const result = await student_module.login(email, password);
  // check if student exists
  if (result.length != 0) {
    // return the student data
    res.send({userType:'student', user: result[0]});
    return;
  } 

  // if the student doesn't exist check if the company exists
  const company_result = await company_module.login(email, password);
  if (company_result.length != 0) {
    // return the company data
    res.send({userType:'company', user: company_result[0]});
    return;
  }
  
  res.status(400).send({ error: "email or password is incorrect"});

};
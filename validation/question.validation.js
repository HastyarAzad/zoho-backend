const Joi = require('joi');

// to validate the user's object
function validate_user_object(user){
  // creating a schema for the user object
  const schema = Joi.object({
    text: Joi.string().min(1).max(100).required(),
    job_id: Joi.number().required().min(0),
  });

  //validating the request body and returning the result
  return schema.validate(user);
}

// to validate the user's id
function validate_user_id(id){
  // creating a schema for the user
  const schema = Joi.object({
    id: Joi.number().required().min(0),
  });

  // validating and returning the joi object
  return schema.validate({ id: id });
}

function validate_user_password(password){
  // creating a schema for the user
  const schema = Joi.object({
    password: Joi.string().min(8).max(35).required(),
  });

  // validating and returning the joi object
  return schema.validate({ password: password });
}

module.exports.validate_user_id = validate_user_id;
module.exports.validate_user_object = validate_user_object;
module.exports.validate_user_password = validate_user_password;

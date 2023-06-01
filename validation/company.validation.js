const Joi = require('joi');

// to validate the user's object
function validate_user_object(user){
  // creating a schema for the user object
  const schema = Joi.object({
    username: Joi.string().min(3).max(35).required(),
    password: Joi.string().min(8).max(35).required(),
    email: Joi.string().min(3).max(320),
    phone: Joi.string().required().min(10).max(14),
    address: Joi.string().min(0).max(200),
    logo: Joi.string().min(3).max(2048).default('not_set'),
    description: Joi.string().min(0).max(500),
  });

  //validating the request body and returning the result
  return schema.validate(user);
}

// validate the user's email
function validate_user_email(email){
  // creating a schema for the user
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(320),
  });

  // validating and returning the joi object
  return schema.validate({ email: email });
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
module.exports.validate_user_email = validate_user_email;
module.exports.validate_user_object = validate_user_object;
module.exports.validate_user_password = validate_user_password;

const Joi = require("joi");

// to validate the user's object
function validate_login_object(user) {
  // creating a schema for the user object
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(35).required(),
  });

  //validating the request body and returning the result
  return schema.validate(user);
}

module.exports.validate_login_object = validate_login_object;

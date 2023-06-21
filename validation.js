const Joi = require('joi');

const taskValidation = data => {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        description: Joi.string().min(5).required(),
        status: Joi.string().valid('pending', 'completed', 'deleted'),
    });
    return schema.validate(data);
};

const taskQueryValidation = data => {
  const schema = Joi.object({
      status: Joi.string().valid('pending', 'completed'),
      search: Joi.string(),
  });
  return schema.validate(data);
};


module.exports.taskValidation = taskValidation;
module.exports.taskQueryValidation = taskQueryValidation;

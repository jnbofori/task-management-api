const Joi = require('joi');

const statusCondition = { status: Joi.string().valid('pending', 'completed') }

const taskValidation = data => {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        description: Joi.string().min(5).required(),
        ...statusCondition
    });
    return schema.validate(data);
};

const taskQueryValidation = data => {
  const schema = Joi.object({
      search: Joi.string(),
      ...statusCondition
  });
  return schema.validate(data);
};


module.exports.taskValidation = taskValidation;
module.exports.taskQueryValidation = taskQueryValidation;

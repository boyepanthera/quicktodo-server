const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required(),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  completed: Joi.boolean(),
});

const validateTaskData = (req, res, next) => {
  let { error, value } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  return next();
};

const validateTaskUpdateData = (req, res, next) => {
  let { error, value } = taskUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  return next();
};

module.exports.validateTaskData = validateTaskData;
module.exports.validateTaskUpdateData = validateTaskUpdateData;

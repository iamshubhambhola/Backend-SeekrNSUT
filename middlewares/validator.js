const options = {
  abortEarly: false, // include all errors
  //   allowUnknown: false, // ignore unknown props
  //   stripUnknown: false, // remove unknown props
};

const requestValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property || "body"], options);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      res.status(422).json({ error });
    }
  };
};
module.exports = requestValidator;

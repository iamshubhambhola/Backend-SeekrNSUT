const Joi = require("joi");
const { roles } = require("../../config/roles");

module.exports = {
  sendOTP: Joi.object().keys({
    phone_number: Joi.string()
      .required()
      .trim()
      .length(12)
      .message("Invalid phone number"),
  }),

  verifyOTP: Joi.object().keys({
    phone_number: Joi.string()
      .required()
      .trim()
      .length(12)
      .message("Invalid phone number"),
    otp: Joi.number().required(),
  }),
};

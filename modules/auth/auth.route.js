const { Router } = require("express");
const router = Router();
const requestValidator = require("../../middlewares/validator");
const controller = require("./auth.controller");
const validations = require("./auth.validator");

router
  .route("/sendOTP")
  .post(requestValidator(validations.sendOTP), controller.sendOTP);
router
  .route("/verifyOTP")
  .post(requestValidator(validations.verifyOTP), controller.verifyOTP);

module.exports = router;

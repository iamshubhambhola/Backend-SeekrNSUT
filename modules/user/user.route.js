const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./user.controller");
const router = Router();

router.route("/me").get(checkAuth, controller.me); 
router.route("/test").post(controller.selectrole); 


module.exports = router;

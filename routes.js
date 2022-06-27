const { Router } = require("express");
const router = Router();

const authRouter = require("./modules/auth/auth.route");
const userRouter = require("./modules/user/user.route");

router.use("/auth", authRouter);
router.use("/users", userRouter); 

module.exports = router;

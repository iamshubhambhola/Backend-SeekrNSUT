const { roles } = require("../config/roles");

function generateOTP() {
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

function isAdmin(req, res, next) {
  if (req.user.role !== roles[4]) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
}

module.exports = {
  generateOTP,
  isAdmin,
};

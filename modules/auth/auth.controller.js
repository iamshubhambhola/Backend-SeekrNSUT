const { roles } = require("../../config/roles");
const UserModel = require("../user/user.model");
const { generateJWT } = require("../../utils/jwt");
const { generateOTP } = require("../../utils/auth");
const { sendSuccess, sendError } = require("../../utils/response");

class Controller {
  async sendOTP(req, res, next) {
    const { phone_number } = req.body;

    let otp = generateOTP();
    try {
      await UserModel.findOneAndUpdate(
        {
          phone_number,
        },
        {
          phone_number,
          role: roles[0],
          otp,
        },
        { upsert: true }
      );
    } catch (err) {
      return next(err);
    }

    // send OTP through a service

    return sendSuccess(res, {
      message: "OTP has been sent!",
      otp,
    });
  }

  async verifyOTP(req, res, next) {
    const { phone_number, otp } = req.body;

    let user;
    try {
      user = await UserModel.findOne({ phone_number });
      if (!user) {
        return sendError(next, "User not found", 404);
      }
    } catch (err) {
      return next(err);
    }

    if (otp != parseInt(user.otp)) {
      return sendError(next, "Incorrect OTP", 401);
    }

    user.confirmed = true;
    user.otp = undefined;

    let userDetails;

    try {
      await user.save();
    } catch (err) {
      return next(err);
    }

    const token = generateJWT({ id: user._id, role: user.role });

    return res.json({
      token,
      account: user.transform(),
      details: userDetails._doc,
    });
  }
}

module.exports = new Controller();

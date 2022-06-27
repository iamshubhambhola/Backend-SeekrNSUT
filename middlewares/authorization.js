const jwt = require("jsonwebtoken");
const { roles, ac } = require("../config/roles");
const UserModel = require("../modules/user/user.model");

async function checkAuth(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    const err = new Error("Auth token missing.");
    err.status = 401;
    return next(err);
  }

  token = token.split(" ")[1];

  const decoded = jwt.decode(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  let user;
  try {
    user = await UserModel.findById(decoded.id).lean().exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (!user.confirmed) {
      return res.status(401).json({
        success: false,
        message: "User not confirmed",
      });
    }

    if (user.blocked) {
      return res.status(401).json({
        success: false,
        message: "User is blocked",
      });
    }
  } catch (err) {
    return next(err);
  }

  req.user = user;
  next();
}

function hasAccess(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = ac.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          success: false,
          message: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  checkAuth,
  hasAccess,
};

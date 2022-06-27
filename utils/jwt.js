const jwt = require("jsonwebtoken");

function generateJWT(payload) {
  return jwt.sign(payload, "hello");
}

module.exports = {
  generateJWT,
};

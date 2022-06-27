const AccessControl = require("accesscontrol");

const roles = [
  "PRINCIPAL",
  "TEACHER",
  "PARENT",
  "STUDENT",
  "ADMIN",
];

// prettier-ignore
const grantList = [
  
];

const ac = new AccessControl(grantList);

module.exports = {
  roles,
  ac,
};

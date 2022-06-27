// const defaultAdmins = [
//   {
//     email: "admin@test.com",
//     password: "admin123.",
//     role: "ADMIN",
//     provider: {
//       name: "email",
//     },
//     blocked: false,
//     confirmed: true,
//     active: true,
//   },
// ];

const defaultAdmins = [];

/* eslint global-require: 0 */
module.exports = () =>
  new Promise((resolve, reject) => {
    console.log("Boot script - initialising default_admin");

    const UserModel = require("../modules/user/user.model");
    (async () => {
      for (const defaultAdmin of defaultAdmins) {
        try {
          const alreadyExistEngineer = await UserModel.findOne({
            email: defaultAdmin.email,
          });
          if (alreadyExistEngineer) continue;
        } catch (e) {
          return reject(e);
        }

        try {
          await UserModel.create(defaultAdmin);
        } catch (e) {
          return reject(e);
        }
      }

      resolve();
    })();
  });

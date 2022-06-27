const fs = require("fs");
const path = require("path");

module.exports = {
  boot: (app) => {
    return new Promise((resolve, reject) => {
      const bootDirPath = path.resolve(`${__dirname}/../boot`);
      fs.readdir(bootDirPath, async (err, files) => {
        if (err) {
          return reject(err);
        } else {
          try {
            for (const file of files) {
              await require(`${bootDirPath}/${file}`)(app);
            }
          } catch (err) {
            reject(err);
          }

          resolve();
        }
      });
    });
  },
};

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
let file = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const control = require(path.join(__dirname, file));
    file[control.name] = control;
  });

module.exports = file;

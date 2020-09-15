const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
let handlers = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const control = require(path.join(__dirname, file));
    handlers[control.name] = control;
  });

module.exports = handlers;

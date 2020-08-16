"use strict";

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let connection = mongoose.connection;
if (config.use_env_variable) {
  let connectionLink = process.env[config.use_env_variable];
  delete config.use_env_variable;
  mongoose.connect(connectionLink, config);
} else {
  mongoose.connect(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(mongoose);
    console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.connection = connection;
db.mongoose = mongoose;

/*
 * Association
 */

module.exports = db;

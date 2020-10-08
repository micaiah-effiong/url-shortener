const { errorResponse } = require("../handlers/index");

module.exports = function isAuth(req, res, next) {
  return !req.isAuthenticated()
    ? next(errorResponse("User is not authenticated", 401))
    : next();
};

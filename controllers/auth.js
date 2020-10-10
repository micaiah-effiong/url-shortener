const { passport, handleAsync } = require("../handlers/index");

module.exports = {
  _name: "auth",
  login: [
    passport.authenticate("local"),
    handleAsync(async (req, res) => {
      const loginTime = new Date();
      req.user.metadata.lastLoginAt = loginTime;
      req.user.metadata.logins.push(loginTime);
      await req.user.save();
      return res.json(req.user.toPublic());
    }),
  ],

  logout: (req, res) => {
    req.logout();
    return req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  },
};

const express = require("express");
const { passport, handleAsync } = require("../handlers/index");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local"),
  handleAsync(async (req, res) => {
    const loginTime = new Date();
    req.user.metadata.lastLoginAt = loginTime;
    req.user.metadata.logins.push(loginTime);
    await req.user.save();
    return res.json(req.user.toPublic());
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;

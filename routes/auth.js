const express = require("express");
const links = require("./links");
const users = require("./users");
const { passport } = require("../handlers/index").auth;
const router = express.Router();
const { visit } = require("../controllers/index").links;

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user.toPublic());
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

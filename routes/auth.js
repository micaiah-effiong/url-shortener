const express = require("express");
const { passport, handleAsync } = require("../handlers/index");
const {
  login,
  logout,
  resetPassword,
  reqPasswordReset,
} = require("../controllers/index").auth;
const router = express.Router();

router.post("/login", login);
router.post("/reset-password/:token", resetPassword);
router.post("/request-password-reset", reqPasswordReset);
router.get("/logout", logout);

module.exports = router;

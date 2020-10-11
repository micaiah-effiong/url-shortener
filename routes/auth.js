const express = require("express");
const { passport, handleAsync } = require("../handlers/index");
const { login, logout } = require("../controllers/index").auth;
const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;

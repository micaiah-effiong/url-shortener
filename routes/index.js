const express = require("express");
const links = require("./links");
const users = require("./users");
const auth = require("./auth");
const router = express.Router();
const { visit } = require("../controllers/index").links;

router.use("/link", links);
router.use("/users", users);
router.use("/auth", auth);

/* GET home page. */
router.get("/:link", visit);

module.exports = router;

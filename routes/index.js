const express = require("express");
const links = require("./links");
const users = require("./users");
const handleAsync = require("../handlers/async-handler");
const router = express.Router();
const { visit } = require("../controllers/index").links;

router.use("/link", links);
router.use("/users", users);

/* GET home page. */
router.get("/:link", visit);

module.exports = router;

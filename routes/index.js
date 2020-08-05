var express = require("express");
var links = require("./links");
var router = express.Router();

router.use("/link", links);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

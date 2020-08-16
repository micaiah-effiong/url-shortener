const express = require("express");
const links = require("./links");
const { link } = require("../models/index");
const handleAsync = require("../handlers/async-handler");
const router = express.Router();

router.use("/link", links);

/* GET home page. */
router.get(
  "/:link",
  handleAsync(async function (req, res, next) {
    let originalUrl = await link.findOne({ slug: req.params.link });
    console.log(originalUrl);
    if (!originalUrl) return next();
    res.redirect(originalUrl.url);
  })
);

module.exports = router;

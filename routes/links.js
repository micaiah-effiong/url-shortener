var express = require("express");
var handleAsync = require("../handles/async-handler");
var { link } = require("../models/index");
var router = express.Router();

router.use((req, res, next) => {
  req.fullPath = `${req.protocol}://${req.hostname}:${req.app.settings.port}${req.originalUrl}`;
  next();
});

/* GET links listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/:link",
  handleAsync(async function (req, res, next) {
    let originalUrl = await link.findOne({ where: { slug: req.params.link } });
    if (!originalUrl) return next();
    res.redirect(`http://${originalUrl.url}`);
  })
);

router.post(
  "/",
  handleAsync(async (req, res, next) => {
    let { slug, url, expiresAt } = req.body;
    expiresAt = expiresAt || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    if (/[^\w\-]/i.test(slug)) return next(Error("Invalid slug"));
    let createdLink = await link.create({ slug, url, expiresAt });
    res.status(201).json({
      success: true,
      data: createdLink,
    });
  })
);

module.exports = router;

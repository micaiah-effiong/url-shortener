const express = require("express");
const { nanoid } = require("nanoid");
const handleAsync = require("../handlers/async-handler");
const { link } = require("../models/index");
const router = express.Router();

router.use((req, res, next) => {
  req.fullPath = `${req.protocol}://${req.hostname}:${req.app.settings.port}${req.originalUrl}`;
  next();
});

/* GET links listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/",
  handleAsync(async (req, res, next) => {
    let { slug, url, expiresAt } = req.body;

    // set expire time is not assigned
    expiresAt = expiresAt || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    if (slug) {
      // check is slug is valid
      if (/[^\w\-]/i.test(slug)) return next(Error("Invalid slug"));
    } else {
      slug = nanoid(7); // create slug with nanoid
    }

    let _modelLink = new link({ slug, url, expiresAt });
    let createdLink = await _modelLink.save();

    res.status(201).json({
      success: true,
      data: createdLink,
    });
  })
);

module.exports = router;

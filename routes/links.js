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
router.get(
  "/",
  handleAsync(async (req, res, next) => {
    let data = await link.find();
    res.json({
      success: true,
      data,
    });
  })
);

router.get(
  "/:slug",
  handleAsync(async (req, res, next) => {
    let data = await link.findOne({ slug: req.params.slug });
    res.json({
      success: true,
      data,
    });
  })
);

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

router.delete(
  "/:slug",
  handleAsync(async (req, res, next) => {
    let data = await link.findOneAndDelete({ slug: req.params.slug });
    console.log(data);
    res.json({
      success: true,
      data,
    });
  })
);

module.exports = router;

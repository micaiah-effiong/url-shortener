const { nanoid } = require("nanoid");
const { handleAsync, errorResponse } = require("../handlers/index");
const { link } = require("../models/index");
let url = "";

module.exports = {
  _name: "links",
  create: handleAsync(async (req, res, next) => {
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
    // let newLinkObj = { ...createdLink._doc };
    data = req.fullPath + createdLink.slug;

    return res.status(201).json({
      success: true,
      data,
    });
  }),

  getAll: handleAsync(async (req, res, next) => {
    let data = await link.find();
    return res.json({
      success: true,
      data,
    });
  }),

  getOne: handleAsync(async (req, res, next) => {
    let data = await link.findOne({ slug: req.params.slug });
    if (!data) return next(errorResponse("BAD REQUEST", 400));
    return res.json({
      success: true,
      data,
    });
  }),

  deleteOne: handleAsync(async (req, res, next) => {
    let data = await link.findOneAndDelete({ slug: req.params.slug });
    return res.json({
      success: true,
      data,
    });
  }),

  visit: handleAsync(async function (req, res, next) {
    const {
      headers: { referer },
      connection: { remoteAddress: ipAddress },
      params: { link: slug },
    } = req;
    const originalUrl = await link.findOne({ slug });
    const hasExpired = Date.now() > new Date(originalUrl.expiresAt).getTime();

    if (!originalUrl) return next();
    if (hasExpired) {
      return next(errorResponse("EXPIRED::URL_NO_LONGER_IN_USE", 400));
    }

    originalUrl.clicks++;
    await originalUrl.visit.push({
      referer,
      ipAddress,
    });

    await originalUrl.save();
    res.redirect(originalUrl.url);
  }),
};

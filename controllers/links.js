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

    const createdLink = await link.create({ slug, url, expiresAt });
    data = req.fullPath + createdLink.slug;

    return res.status(201).json({ url: data });
  }),

  getAll: handleAsync(async (req, res, next) => {
    let data = await link.find();
    return res.json(data);
  }),

  getOne: handleAsync(async (req, res, next) => {
    let data = await link.findOne({ slug: req.params.slug });
    if (!data) return next(errorResponse("BAD REQUEST", 400));
    return res.json(data);
  }),

  deleteOne: handleAsync(async (req, res, next) => {
    let data = await link.findOneAndDelete({ slug: req.params.slug });
    return res.json(data);
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

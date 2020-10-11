const { nanoid } = require("nanoid");
const { handleAsync, errorResponse } = require("../handlers/index");
const { link } = require("../models/index");
const QRCode = require("qrcode");
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
    const data = req.fullPath + createdLink.slug;

    if (req.user) {
      // associate user with created link
      req.user.links.push(createdLink._id);
      await req.user.save();
    }

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
    if (!originalUrl) return next(errorResponse("RESOURCE NOT FOUND", 404));

    const hasExpired = Date.now() > new Date(originalUrl.expiresAt).getTime();
    console.log(req.headers["user-agent"]);
    if (hasExpired) {
      await originalUrl.delete();
      return next(errorResponse("RESOURCE NOT FOUND", 404));
    }

    originalUrl.clicks++;
    await originalUrl.visit.push({
      referer,
      ipAddress,
      userAgent: req.headers["user-agent"],
    });

    await originalUrl.save();
    res.redirect(originalUrl.url);
  }),
};

/*ADDING QRCODE FEATURE*/
// QRCode.toString(data, { type: "terminal" }, function (err, url) {
//   console.log(url);
// });

// QRCode.toDataURL(data, function (err, url) {
//   console.log(url);
// });

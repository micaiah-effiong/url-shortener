const { nanoid } = require("nanoid");
const {
  handleAsync,
  errorResponse,
  pagination,
  advanceQuery,
} = require("../handlers/index");
const { link, matirics } = require("../models/index");
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
    const query = link.find();
    advanceQuery(query, req.query);
    const paginate = await pagination(query, req.query);
    let data = await query.exec();
    return res.json({ data, pagination: paginate });
  }),

  getOne: handleAsync(async (req, res, next) => {
    let data = await link.findOne({ slug: req.params.slug }).exec();
    if (!data) return next(errorResponse("BAD REQUEST", 400));
    return res.json(data);
  }),

  deleteOne: handleAsync(async (req, res, next) => {
    let data = await link.findOneAndDelete({ slug: req.params.slug }).exec();
    return res.json(data);
  }),

  visit: handleAsync(async function (req, res, next) {
    const {
      headers: { referer },
      connection: { remoteAddress: ipAddress },
      params: { link: slug },
    } = req;
    const originalUrl = await link.findOne({ slug }).exec();
    if (!originalUrl) return next(errorResponse("RESOURCE NOT FOUND", 404));

    const hasExpired = Date.now() > new Date(originalUrl.expiresAt).getTime();

    if (hasExpired) {
      await originalUrl.delete();
      return next(errorResponse("RESOURCE NOT FOUND", 404));
    }

    const clickMatrics = await matirics.create({
      referer,
      ipAddress,
      userAgent: req.headers["user-agent"],
    });

    originalUrl.clicks++;
    await originalUrl.visit.push(clickMatrics._id);

    await originalUrl.save();
    res.redirect(originalUrl.url);
  }),

  linkQRcode: handleAsync(async (req, res, next) => {
    // find link
    const result = await link.findOne({ slug: req.query.url }).exec();
    if (!result) return next(errorResponse("RESOURCE NOT FOUND", 404));

    // generate QR-code
    const fullLink = req.fullPath + result.slug;
    let url = await QRCode.toDataURL(fullLink);

    if (!url) return next(err);
    return res.json({ data: url });
  }),
};

/*ADDING QRCODE FEATURE*/
// QRCode.toString(data, { type: "terminal" }, function (err, url) {
//   console.log(url);
// });

// QRCode.toDataURL(data, function (err, url) {
//   console.log(url);
// });

const { nanoid } = require("nanoid");
const {
  handleAsync,
  errorResponse,
  pagination,
  advanceQuery,
} = require("../handlers/index");
const { user, link } = require("../models/index");

const getOne = handleAsync(async (req, res, next) => {
  const data = await user.findOne({ _id: req.params.id }).exec();
  if (!data) return next(errorResponse("BAD REQUEST", 400));

  return res.json({
    data: data.toPublic(),
  });
});

const getAll = handleAsync(async (req, res, next) => {
  const query = user.find();
  const paginate = await pagination(query, req.query);
  const data = await query.exec();
  return res.json({
    data: data.map((u) => u.toPublic()),
    pagination: paginate,
  });
});

const create = handleAsync(async (req, res, next) => {
  const body = { ...req.body, auth: { hash: req.body.password } };
  /*const data = (*/ await user.create(body) /*).toPublic()*/;
  res.status(201);
  return next();
});

const update = handleAsync(async (req, res, next) => {
  const data = await user.findByIdAndUpdate(req.params.id, req.body).exec();
  return res.json(data.toPublic());
});

/*
@auth
*/
const profile = handleAsync(async (req, res, next) => {
  return res.json(req.user.toUserPublic());
});

/*
@auth
*/
const userLinks = handleAsync(async (req, res, next) => {
  req.query.user = req.user._id;
  const query = link.find();
  advanceQuery(query, req.query);
  const paginate = await pagination(query, req.query);
  const data = await query.exec();
  return res.json({ data, pagination: paginate });
});

const deleteOne = handleAsync(async (req, res, next) => {
  const data = await user.findByIdAndDelete(req.params.id).exec();
  return res.json(data);
});

module.exports = {
  _name: "users",
  getOne,
  getAll,
  create,
  update,
  deleteOne,
  profile,
  userLinks,
};

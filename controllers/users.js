const { nanoid } = require("nanoid");
const { handleAsync, errorResponse } = require("../handlers/index");
const { user } = require("../models/index");

const getOne = handleAsync(async (req, res, next) => {
  const data = await user.findOne({ _id: req.params.id }).exec();
  if (!data) return next(errorResponse("BAD REQUEST", 400));

  return res.json({
    data: data.toPublic(),
  });
});

const getAll = handleAsync(async (req, res, next) => {
  let data = await user.find().exec();
  return res.json(data.map((u) => u.toPublic()));
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
};

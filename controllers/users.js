const { nanoid } = require("nanoid");
const { handleAsync, errorResponse } = require("../handlers/index");
const { user } = require("../models/index");

const getOne = handleAsync(async (req, res, next) => {
  const data = await user.findOne({ _id: req.params.id });
  if (!data) return next(errorResponse("BAD REQUEST", 400));
  return res.json({
    data: "Success!",
  });
});

const getAll = handleAsync(async (req, res, next) => {
  let data = await user.find();
  return res.json(data);
});

const create = handleAsync(async (req, res, next) => {
  const body = { ...req.body, hash: req.body.password };
  const data = (await user.create(body)).toPublic();
  return res.json(data);
});

const update = handleAsync(async (req, res, next) => {
  const data = await user.findByIdAndUpdate(req.params.id, req.body);
  return res.json(data);
});

const deleteOne = handleAsync(async (req, res, next) => {
  const data = await user.findByIdAndDelete(req.params.id);
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

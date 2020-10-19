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

const deleteOne = handleAsync(async (req, res, next) => {
  const data = await user.findByIdAndDelete(req.params.id).exec();
  return res.json(data);
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

const shareLinkWithUsers = handleAsync(async (req, res, next) => {
  // send invitation mail to user
  const query = link.findOne({ slug: req.params.link });
  const result = await query.exec();
  const queryUser = user.findOne({ email: req.body.user });
  const resultUser = await queryUser.exec();

  if (!(result || resultUser)) return next(errorResponse("RESOURCE NOT FOUND"));
  if (result.invite.includes(req.body.user)) return res.json({ success: true });

  result.invite.push(resultUser._id);
  await result.save();
  return res.json({ success: true });
});

const acceptLinkInvite = handleAsync(async (req, res, next) => {
  const query = link.findOne({ slug: req.params.link });
  const result = await query.exec();

  // catch errors
  if (!result) return next(errorResponse("RESOURCE NOT FOUND"));
  if (!result.invite.includes(req.user._id))
    return next(errorResponse("FORBBIDEN", 403));

  // modify
  req.user.sharedLinks.push(result._id);
  const index = result.invite.indexOf(req.user._id);
  result.coUsers.push(result.invite.splice(index, 1));

  // save
  await req.user.save();
  await result.save();

  // send response
  return res.json({ success: true });
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
  shareLinkWithUsers,
  acceptLinkInvite,
};

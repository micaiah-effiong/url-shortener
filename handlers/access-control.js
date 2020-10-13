module.exports = function accessControl(...data) {
  if (!(data || Array.isArray(data))) throw Error("data must be an Array");

  return (req, res, next) => {
    console.log(
      data,
      data.includes(req.user.role),
      req.user.role,
      req.user,
      !(req.user && data.includes(req.user.role))
    );
    if (!(req.user && data.includes(req.user.role)))
      return next(Error("UNAUTHORIZED"));

    return next();
  };
};

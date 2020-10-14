module.exports = function accessControl(...data) {
  if (!data) throw Error("data can not be null or undefined");

  if (!Array.isArray(data)) throw Error("data must be an Array");

  return (req, res, next) => {
    if (!(req.user && data.includes(req.user.role)))
      return next(Error("UNAUTHORIZED"));
    return next();
  };
};

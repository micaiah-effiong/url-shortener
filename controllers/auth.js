const jwt = require("jsonwebtoken");
const { passport, handleAsync, errorResponse } = require("../handlers/index");
const { user: User } = require("../models/index");

module.exports = {
  _name: "auth",
  login: [
    passport.authenticate("local"),
    handleAsync(async (req, res, next) => {
      const loginTime = new Date();
      req.user.metadata.lastLoginAt = loginTime;
      req.user.metadata.logins.push({
        userAgent: req.headers["user-agent"],
        ipAddress: req.connection.remoteAddress,
        loginTime,
      });
      await req.user.save();
      return res.json(req.user.toPublic());
    }),
  ],

  logout: (req, res) => {
    req.logout();
    return req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  },

  resetPassword: handleAsync(async (req, res, next) => {
    // decrypt url-parameter
    const token = req.params.token;
    jwt.verify(
      token,
      process.env.PASSWORD_RESET_SECRET,
      async (err, decodedToken) => {
        if (err) return next(err);

        const user = await User.findById(decodedToken.id);
        if (!user) return next(errorResponse("UNAUTHORIZED", 401)); // status code shold forbid
        if (token !== user.auth.passwordResetToken)
          return next(errorResponse("FORBIDDEN", 403));

        user.auth.passwordResetToken = null;
        await user.resetPassword(req.body.newPassword);
        await user.save();
        return res.json({ success: true });
      }
    );
  }),

  reqPasswordReset: handleAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(errorResponse("RESOURCE NOT FOUND", 404));

    jwt.sign(
      { id: user._id },
      process.env.PASSWORD_RESET_SECRET,
      { expiresIn: 60 },
      async (err, token) => {
        if (err) return next(err);

        user.auth.passwordResetToken = token;
        await user.save();
        // send a reset password email to the user
        return res.json({ success: true });
      }
    );
  }),
};

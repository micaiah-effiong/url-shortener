const passport = require("passport");
const Local = require("passport-local").Strategy;
const { user: Users } = require("../models");

passport.use(
  new Local(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        let user = await Users.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        if (!(await user.verifyPassword(password))) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        throw err;
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    let user = await Users.findById(id);
    if (!user) throw Error("UNAUTHORIZED");
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.name = "passport";
module.exports = passport;

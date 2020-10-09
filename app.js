const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);
const { passport } = require("./handlers/index");
const indexRouter = require("./routes/index");

const app = express();
const fileStoreOptions = {};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(cookieParser());
const sessOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(fileStoreOptions),
};
app.use(expressSession(sessOption)); //will be set with secret form env
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// main route
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("resources not found");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log({ err, msg: err.message, r: err.stack });

  // render the error page
  res.status(err.statusCode || 500);
  res.json({ err, msg: err.message, r: err.stack });
});

module.exports = app;

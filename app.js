var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);
const { passport } = require("./handlers/index").auth;

var indexRouter = require("./routes/index");
const { link } = require("./models/index");

const app = express();
const fileStoreOptions = {};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let sessOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(fileStoreOptions),
};
app.use(expressSession(sessOption)); //will be set with secret form env
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

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

  // render the error page
  res.status(err.statusCode || 500);
  res.json({ err, msg: err.message });
});

module.exports = app;

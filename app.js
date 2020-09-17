var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSession = require("express-session");
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroExpress = require("@admin-bro/express");

var indexRouter = require("./routes/index");
const { link } = require("./models/index");

/*admin-bro setup*/
AdminBro.registerAdapter(AdminBroMongoose);
var app = express();
const adminBro = new AdminBro({
  databases: [],
  rootPath: "/admin",
  resources: [link],
});

const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
  res.json({ success: false, err, msg: err.message });
});

module.exports = app;

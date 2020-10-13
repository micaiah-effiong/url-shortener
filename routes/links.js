const express = require("express");
const { nanoid } = require("nanoid");
const {
  create,
  linkQRcode,
  getAll,
  getOne,
  deleteOne,
} = require("../controllers/index").links;
const { isAuth } = require("../middlewares/index");
const { accessControl } = require("../handlers/index");
const router = express.Router();
const url = "";

// middleware
router.use((req, res, next) => {
  req.fullPath =
    url || `${req.protocol}://${req.hostname}:${req.app.settings.port}/`;
  next();
});

// links endpoints
router.route("/").get(isAuth, getAll).post(create);
router.get("/qrcode", linkQRcode);
router.route("/:slug").get(isAuth, getOne).delete(isAuth, deleteOne);

module.exports = router;

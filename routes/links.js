const express = require("express");
const { nanoid } = require("nanoid");
const {
  create,
  getAll,
  getOne,
  deleteOne,
} = require("../controllers/index").links;
const router = express.Router();
const url = "";

// middleware
router.use((req, res, next) => {
  req.fullPath =
    url ||
    `${req.protocol}://${req.hostname}:${req.app.settings.port}/` /*${req.originalUrl}*/;
  next();
});

/* GET links listing. */
router.route("/").get(getAll).post(create);
router.route("/:slug").get(getOne).delete(deleteOne);

module.exports = router;

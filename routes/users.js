const express = require("express");
const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} = require("../controllers/index").users;
const { isAuth } = require("../middlewares/index");
const { login } = require("../controllers/index").auth;
const router = express.Router();

router.route("/").get(isAuth, getAll).post(create, login);
router.use(isAuth);
router.route("/:id").get(getOne).put(update).delete(deleteOne);

module.exports = router;

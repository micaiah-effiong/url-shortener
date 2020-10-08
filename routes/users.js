const express = require("express");
const { nanoid } = require("nanoid");
const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} = require("../controllers/index").users;
const { isAuth } = require("../middlewares/index");
const router = express.Router();

router.route("/").get(isAuth, getAll).post(create);
router.use(isAuth);
router.route("/:id").get(getOne).put(update).delete(deleteOne);

module.exports = router;

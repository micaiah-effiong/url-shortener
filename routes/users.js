const express = require("express");
const { nanoid } = require("nanoid");
const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} = require("../controllers/index").users;
const router = express.Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(update).delete(deleteOne);

module.exports = router;

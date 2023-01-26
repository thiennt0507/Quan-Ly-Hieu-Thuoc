const express = require("express");

const {
  createHDN,
  createHDX,
} = require("./../controllers/createDocxController");

const router = express.Router();

router.get("/hoadonnhap/:id", createHDN);
router.get("/hoadonxuat/:id", createHDX);

module.exports = router;

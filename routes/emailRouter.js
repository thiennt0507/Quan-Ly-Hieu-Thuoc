const express = require("express");
const router = express.Router();
const { createBCDT, createTKHTK } = require("./../controllers/emaiControllerl");
const { checkRole, restrictTo } = require("../controllers/loginController");

router.post("/BCDT", checkRole, createBCDT);
router.get("/TKHTK", checkRole, createTKHTK);

module.exports = router;

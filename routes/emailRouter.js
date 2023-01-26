const express = require("express");
const router = express.Router();
const { createBCDT, createTKHTK } = require("./../controllers/emaiControllerl");

router.post("/BCDT", createBCDT);
router.get("/TKHTK", createTKHTK);

module.exports = router;

const express = require("express");
const router = express.Router();
const CTHDXSessionController = require("./../controllers/CTHDXSessionController");
const { checkRole, restrictTo } = require("../controllers/loginController");

router
  .route("/")
  .get(CTHDXSessionController.getAllCTHDX)
  .post(CTHDXSessionController.selectCTHDX)
  .delete(CTHDXSessionController.deleteAllCTHDX);
router
  .route("/:id")
  .delete(CTHDXSessionController.deleteCTHDX)
  .patch(CTHDXSessionController.updateCTHDX);

module.exports = router;

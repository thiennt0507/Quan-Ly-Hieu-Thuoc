const express = require("express");
const router = express.Router();
const CTHDNSessionController = require("./../controllers/CTHDNSessionController");
const { checkRole, restrictTo } = require("../controllers/loginController");

router
  .route("/")
  .get(CTHDNSessionController.getAllCTHDN)
  .post(checkRole, restrictTo(1, 2), CTHDNSessionController.selectCTHDN)
  .delete(CTHDNSessionController.deleteAllCTHDN);
router
  .route("/:id")
  .delete(CTHDNSessionController.deleteCTHDN)
  .patch(CTHDNSessionController.updateCTHDN);

module.exports = router;

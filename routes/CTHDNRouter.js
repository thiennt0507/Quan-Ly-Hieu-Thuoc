const express = require("express");
const router = express.Router();

const CTHDNController = require("../controllers/CTHDNController");

router
  .route("")
  .get(CTHDNController.getAllCTHDN)
  .post(CTHDNController.createCTHDN);
router
  .route("/:id")
  .get(CTHDNController.getCTHDN)
  .patch(CTHDNController.updateCTHDN)
  .delete(CTHDNController.deleteCTHDN);

module.exports = router;

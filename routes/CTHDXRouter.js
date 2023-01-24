const express = require("express");
const router = express.Router();

const CTHDXController = require("../controllers/CTHDXController");

router
  .route("")
  .get(CTHDXController.getAllCTHDX)
  .post(CTHDXController.createCTHDX);
router
  .route("/:id")
  .get(CTHDXController.getCTHDX)
  .patch(CTHDXController.updateCTHDX)
  .delete(CTHDXController.deleteCTHDX);

module.exports = router;

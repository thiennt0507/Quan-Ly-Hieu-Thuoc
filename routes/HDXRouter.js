const express = require("express");
const router = express.Router();

const HDXController = require("../controllers/HDXController");
const { checkRole } = require("../controllers/loginController");

router
  .route("")
  .get(HDXController.getAllHDX)
  .post(checkRole, HDXController.createHDX);
router
  .route("/:id")
  .get(HDXController.getHDX)
  .patch(HDXController.updateHDX)
  .delete(HDXController.deleteHDX);

module.exports = router;

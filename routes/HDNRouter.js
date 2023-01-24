const express = require("express");
const router = express.Router();

const HDNController = require("../controllers/HDNController");
const { checkRole } = require("../controllers/loginController");

router
  .route("")
  .get(HDNController.getAllHDN)
  .post(checkRole, HDNController.createHDN);
router
  .route("/:id")
  .get(HDNController.getHDN)
  .patch(HDNController.updateHDN)
  .delete(HDNController.deleteHDN);

module.exports = router;

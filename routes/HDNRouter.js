const express = require("express");
const router = express.Router();

const HDNController = require("../controllers/HDNController");

router.route("").get(HDNController.getAllHDN).post(HDNController.createHDN);
router
  .route("/:id")
  .get(HDNController.getHDN)
  .patch(HDNController.updateHDN)
  .delete(HDNController.deleteHDN);

module.exports = router;

const express = require("express");
const router = express.Router();

const manageController = require("../controllers/manageController");

router
  .route("")
  .get(manageController.getAllDrugs)
  .post(manageController.createDrug);
router
  .route("/:id")
  .get(manageController.getDrug)
  .patch(manageController.updateDrug)
  .delete(manageController.deleteDrug);
router.route("/:id/:type").patch(manageController.changeQuantityDrug);

module.exports = router;

const express = require("express");
const router = express.Router();
const distributorController = require("../controllers/distributorController");

router
  .route("")
  .get(distributorController.getAllDistributors)
  .post(distributorController.createDistributor);
router
  .route("/:id")
  .get(distributorController.getDistributor)
  .patch(distributorController.updateDistributor)
  .delete(distributorController.deleteDistributor);

module.exports = router;

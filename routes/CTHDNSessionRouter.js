let express = require("express");
let router = express.Router();
let CTHDNSessionController = require("./../controllers/CTHDNSessionController");

router
  .route("/select")
  .get(CTHDNSessionController.getAllCTHDN)
  .post(CTHDNSessionController.selectCTHDN);
router.route("/delete/:id").delete(CTHDNSessionController.deleteCTHDN);

module.exports = router;

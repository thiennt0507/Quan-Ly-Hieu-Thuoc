const express = require("express");
const {
  getHomePage,
  getManagePage,
  getClientsPage,
  getImportPage,
  getSellPage,
  getStatisticalPage,
  getUsersPage,
  getLoginPage,
  getDistributorsPage,
} = require("../controllers/pageController");

const { checkRole, restrictTo } = require("../controllers/loginController");

const router = express.Router();

router.route("/homepage").get(getHomePage);
router.route("/managepage").get(getManagePage);
router.route("/sellpage").get(getSellPage);
router.route("/importpage").get(checkRole, restrictTo(1), getImportPage);
router.route("/clientspage").get(getClientsPage);
router.route("/userspage").get(checkRole, restrictTo(1), getUsersPage);
router
  .route("/statisticalpage")
  .get(checkRole, restrictTo(1, 2), getStatisticalPage);
router.route("/").get(getLoginPage);
router
  .route("/distributorspage")
  .get(checkRole, restrictTo(1), getDistributorsPage);

module.exports = router;

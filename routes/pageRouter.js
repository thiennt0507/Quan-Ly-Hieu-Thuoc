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
} = require("../controllers/pageController");

const router = express.Router();

router.route("/homepage").get(getHomePage);
router.route("/managepage").get(getManagePage);
router.route("/sellpage").get(getSellPage);
router.route("/importpage").get(getImportPage);
router.route("/clientspage").get(getClientsPage);
router.route("/userspage").get(getUsersPage);
router.route("/statisticalpage").get(getStatisticalPage);
router.route("/").get(getLoginPage);

module.exports = router;

const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.route("/login").post(loginController.login);
router.route("/logout").delete(loginController.logout);
router.route("/role").get(loginController.role);

module.exports = router;

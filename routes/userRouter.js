const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.route("/login/:TaiKhoan").get(userController.getUserByUserName);
router.route("/login/:TaiKhoan/:IsLogin").get(userController.updateLoginUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("")
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = router;

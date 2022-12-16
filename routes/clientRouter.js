const express = require("express");
const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const router = express.Router();

router.route("/").get(getAllClients).post(createClient);
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);

module.exports = router;

const connection = require("../database/connectdb");
const session = require("express-session");

var sess;

const login = (req, res) => {
  sess = req.session;
  sess.username = req.body.username;
  console.log(sess.id, sess);
  res.status(200).json({
    status: "login successful",
  });
};

const role = (req, res) => {
  try {
    res.status(200).json({
      status: "role successful",
      result: sess.username,
    });
  } catch (err) {
    res.status(404).json({
      stattus: "role not found",
      result: "Logout",
    });
  }
};

const logout = (req, res) => {
  sess = req.session;
  sess = null;
  console.log(sess);
  res.status(404).json({
    status: "Logout",
  });
};

module.exports = { login, logout, role };

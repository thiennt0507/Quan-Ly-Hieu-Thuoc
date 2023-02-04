const session = require("express-session");
const util = require("util");
const connection = require("../database/connectdb");
const { deleteAllCTHDN } = require("./CTHDNSessionController");

var sess;
const query = util.promisify(connection.query).bind(connection);

const getIDUser = async (username) => {
  const result = await query(
    `select IDNhanVien, ChucVu, Email from nhanvien where TaiKhoan = '${username}'`
  );
  return result[0];
};

const login = async (req, res) => {
  sess = req.session;
  sess.username = req.body.username;
  sess.userId = (await getIDUser(sess.username)).IDNhanVien;
  sess.userRole = (await getIDUser(sess.username)).ChucVu;
  sess.userEmail = (await getIDUser(sess.username)).Email;
  console.log(sess);
  res.status(200).json({
    status: "login successful",
  });
};

const checkRole = (req, res, next) => {
  const user = {
    role: req.session.userRole ? req.session.userRole : null,
    id: req.session.userId ? req.session.userId : null,
    name: req.session.username ? req.session.username : null,
    email: req.session.userEmail ? req.session.userEmail : null,
  };
  req.user = user;
  console.log("check role: ", req.session);
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.render("NotPermissionPage.ejs");
    } else {
      next();
    }
  };
};

const checkLogin = (req, res) => {
  try {
    res.status(200).json({
      status: "User logged in successfully",
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
  sess = null;
  res.status(404).json({
    status: "Logout",
  });
};

module.exports = { login, logout, checkLogin, restrictTo, checkRole };

let session = require("express-session");
// let cookieParser = require("cookie-parser");
var sess;

const getAllCTHDX = (req, res) => {
  try {
    // sess = req.session;
    let result = sess.CTHDX ? sess.CTHDX : [];
    console.log(result);
    res.status(200).json({
      status: "OK",
      result,
    });
  } catch (err) {
    res.status(404).json({
      status: "Empty CTHDX",
      message: err.message,
    });
  }
};

const selectCTHDX = (req, res) => {
  if (!sess || !sess.CTHDX) {
    sess = req.session;
    sess.CTHDX = [];
  }
  sess.CTHDX.push(req.body);
  const result = sess.CTHDX;
  res.status(200).json({
    status: "success",
    result,
  });
};

const updateCTHDX = (req, res) => {
  try {
    sess = req.session;
    sess.CTHDX.splice(req.params.id, 1, req.body);
    const result = sess.CTHDX;
    res.status(201).json({
      status: "success",
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteCTHDX = (req, res) => {
  // sess = req.session;
  sess.CTHDX.splice(req.params.id, 1);
  res.status(204).json({
    status: "success",
  });
};

const deleteAllCTHDX = (req, res) => {
  sess = req.session;
  sess.CTHDX ? sess.CTHDX.splice(0, sess.CTHDX.length) : sess.CTHDX;
  res.status(204).json({
    status: "success",
  });
};

module.exports = {
  getAllCTHDX,
  selectCTHDX,
  updateCTHDX,
  deleteCTHDX,
  deleteAllCTHDX,
};

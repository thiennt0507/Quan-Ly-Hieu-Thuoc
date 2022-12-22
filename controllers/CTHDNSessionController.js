let session = require("express-session");
// let cookieParser = require("cookie-parser");
var CTHDN = [];

const getAllCTHDN = (req, res) => {
  // let sess = req.session;
  // let result = sess.CTHDN ? sess.CTHDN : [];

  // sess.save(function (err) {
  //   sess.reload(function (err) {
  //     if (err) {
  //       console.error(err);
  //     }
  //     console.log(sess);
  //   });
  // });

  // console.log(sess.id, sess);
  res.status(200).json({
    status: "OK",
    result: CTHDN,
  });
};

const selectCTHDN = (req, res) => {
  // let sess = req.session;
  // if (!sess.CTHDN) {
  //   sess.CTHDN = [];
  // }
  CTHDN.push(req.body);
  // console.log(sess.id, sess);
  // let result = sess.CTHDN;
  res.status(200).json({
    status: "success",
    result: CTHDN,
  });
};

const deleteCTHDN = (req, res) => {
  CTHDN.splice(req.params.id, 1);
  res.status(204).json({
    status: "success",
  });
};

module.exports = {
  getAllCTHDN,
  selectCTHDN,
  deleteCTHDN,
};

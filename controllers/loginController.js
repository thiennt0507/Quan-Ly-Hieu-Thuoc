const connection = require("../database/connectdb");

const getUserLogin = (req, res) => {
  const query = "SELECT * FROM taikhoan WHERE IsLogin = 1";
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({
        result,
      });
    }
  });
};

module.exports = { getUserLogin };

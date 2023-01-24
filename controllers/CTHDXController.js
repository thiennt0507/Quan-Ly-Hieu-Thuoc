const connection = require("../database/connectdb");

const getAllCTHDX = (req, res) => {
  connection.query("select * from chitiethoadonxuat", (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      res.status(200).json({
        status: "success",
        result,
      });
    }
  });
};

const getCTHDX = (req, res) => {
  connection.query(
    `select * from chitiethoadonxuat where ${req.params.id} `,
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
        res.status(200).json({
          status: "success",
          result,
        });
      }
    }
  );
};

const createCTHDX = (req, res) => {
  const query = `insert into chitiethoadonxuat (IDHoaDonXuat, IDThuoc, SoLuong)
  values ("${req.body.IDHoaDonXuat}", "${req.body.IDThuoc}", "${req.body.SoLuong}")`;
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(201).json({
        status: "success",
        result,
      });
    }
  });
};

const updateCTHDX = (req, res) => {
  const query = `update chitiethoadonxuat
  set IDHoaDonXuat= "${req.body.IDHoaDonXuat}", IDThuoc="${req.body.IDThuoc}", SoLuong="${req.body.SoLuong}"
  where IDChiTietHDX = ${req.params.id}`;
  connection.query(query, (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      res.status(200).json({
        status: "success",
        result,
      });
    }
  });
};

const deleteCTHDX = (req, res) => {
  connection.query(
    `delete from chitiethoadonxuat where IDChiTietHDX = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
        res.status(204).json({
          status: "success",
          result,
        });
      }
    }
  );
};

module.exports = {
  getAllCTHDX,
  getCTHDX,
  createCTHDX,
  deleteCTHDX,
  updateCTHDX,
};

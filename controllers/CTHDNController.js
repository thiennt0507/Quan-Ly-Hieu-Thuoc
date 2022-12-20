const connection = require("../database/connectdb");

const getAllCTHDN = (req, res) => {
  connection.query("select * from chitiethoadonnhap", (err, result) => {
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

const getCTHDN = (req, res) => {
  connection.query(
    `select * from chitiethoadonnhap where IDChiTietHDN = ${req.params.id}`,
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

const createCTHDN = (req, res) => {
  const query = `insert into chitiethoadonnhap (IDHoaDonNhap, IDThuoc, SoLuong, GiaNhap)
                  values("${req.body.IDHoaDonNhap}", "${req.body.IDThuoc}", "${req.body.SoLuong}", "${req.body.GiaNhap}")`;
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

const updateCTHDN = (req, res) => {
  const query = `update chitiethoadonnhap
                 set IDHoaDonNhap= "${req.body.IDHoaDonNhap}", IDThuoc="${req.body.IDThuoc}", SoLuong="${req.body.SoLuong}", GiaNhap="${req.body.GiaNhap}"
                 where IDChiTietHDN = ${req.params.id}`;
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

const deleteCTHDN = (req, res) => {
  connection.query(
    `delete from chitiethoadonnhap where IDChiTietHDN = ${req.params.id}`,
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
  getAllCTHDN,
  getCTHDN,
  createCTHDN,
  updateCTHDN,
  deleteCTHDN,
};

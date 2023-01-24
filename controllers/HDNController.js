const connection = require("../database/connectdb");

const getAllHDN = (req, res) => {
  connection.query(
    `select hoadonnhap.IDHoaDonNhap, hoadonnhap.IDNhaPhanPhoi, nhaphanphoi.TenNPP, hoadonnhap.TongTienThuoc, hoadonnhap.TongThue, hoadonnhap.TongTienHDN, hoadonnhap.NgayNhap, nhanvien.HoTen  from hoadonnhap
    inner join nhaphanphoi on nhaphanphoi.IDNhaPhanPhoi = hoadonnhap.IDNhaPhanPhoi
    inner join nhanvien on nhanvien.IDNhanVien = hoadonnhap.IDNhanVien
    ORDER BY IDHoaDonNhap`,
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

const getHDN = (req, res) => {
  connection.query(
    `select * from hoadonnhap where IDHoaDonNhap = ${req.params.id}`,
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

const createHDN = (req, res) => {
  console.log(req.user.id);
  const query = `insert into hoadonnhap (IDNhaPhanPhoi, IDNhanVien, TongTienThuoc, TongThue, TongTienHDN, NgayNhap)
                  values("${req.body.IDNhaPhanPhoi}", "${req.user.id}", "${req.body.TongTienThuoc}", "${req.body.TongThue}", "${req.body.TongTienHDN}", "${req.body.NgayNhap}")`;
  connection.query(query, (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log(result.insertId);
      res.status(201).json({
        status: "success",
        result,
      });
    }
  });
};

const updateHDN = (req, res) => {
  const query = `update hoadonnhap
                 set IDNhaPhanPhoi= "${req.body.IDNhaPhanPhoi}", TongThue="${req.body.TongThue}", TongTienHDN="${req.body.TongTienHDN}", NgayNhap="${req.body.NgayNhap}"
                 where IDHoaDonNhap = ${req.params.id}`;
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

const deleteHDN = (req, res) => {
  const query = `delete chitiethoadonnhap.*, hoadonnhap.* from chitiethoadonnhap inner join hoadonnhap
  where chitiethoadonnhap.IDHoaDonNhap = hoadonnhap.IDHoaDonNhap and chitiethoadonnhap.IDHoaDonNhap = "${req.params.id}"`;
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      res.status(404).json({
        status: "success",
        message: err.message,
      });
    } else {
      res.status(204).json({
        status: "success",
        result,
      });
    }
  });
};

module.exports = {
  getAllHDN,
  getHDN,
  createHDN,
  updateHDN,
  deleteHDN,
};

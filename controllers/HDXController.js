const { query } = require("express");
const connection = require("../database/connectdb");

const getAllHDX = (req, res) => {
  connection.query(
    `select hoadonxuat.IDHoaDonXuat, hoadonxuat.IDKhachHang, khachhang.TenKhachHang, hoadonxuat.TongTienThuoc, hoadonxuat.TongThue, hoadonxuat.TongTienHDX, hoadonxuat.NgayXuat, nhanvien.HoTen  from hoadonxuat
    inner join khachhang on khachhang.IDKhachHang = hoadonxuat.IDKhachHang
    inner join nhanvien on nhanvien.IDNhanVien = hoadonxuat.IDNhanVien
    ORDER BY IDHoaDonXuat`,
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

const getHDX = (req, res) => {
  connection.query(
    `select * from hoadonxuat where IDHoaDonXuat = ${req.params.id}`,
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

const createHDX = (req, res) => {
  const query = `insert into hoadonxuat (IDKhachHang, IDNhanVien, TongTienThuoc, TongThue, TongTienHDX, NgayXuat)
                  values("${req.body.IDKhachHang}", "${req.user.id}", "${req.body.TongTienThuoc}", "${req.body.TongThue}", "${req.body.TongTienHDX}", "${req.body.NgayXuat}")`;
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

const updateHDX = (req, res) => {
  const query = `update hoadonxuat
                 set IDKhachHang= "${req.body.IDKhachHang}", TongThue="${req.body.TongThue}", TongTienHDX="${req.body.TongTienHDX}", NgayXuat="${req.body.NgayXuat}"
                 where IDHoaDonXuat = ${req.params.id}`;
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

const deleteHDX = (req, res) => {
  connection.query(
    `delete chitiethoadonxuat, hoadonxuat from chitiethoadonxuat inner join hoadonxuat
    where chitiethoadonxuat.IDHoaDonXuat = hoadonxuat.IDHoaDonXuat and chitiethoadonxuat.IDHoaDonXuat = "${req.params.id}"`,
    (err, result) => {
      if (err) {
        console.log(query);
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
    }
  );
};

module.exports = {
  getAllHDX,
  getHDX,
  createHDX,
  updateHDX,
  deleteHDX,
};

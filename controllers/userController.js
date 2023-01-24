const connection = require("../database/connectdb");

const getAllUsers = (req, res) => {
  const query = `Select *, DATE_FORMAT(NgaySinh, '%Y/%d/%m %H:%i') as NS from nhanvien`;

  connection.query(query, (err, result) => {
    if (err) {
      throw new Error();
    } else {
      res.status(200).json({
        result,
      });
    }
  });
};

const getUserById = (req, res) => {
  console.log("getUserById");
  const query = `SELECT * FROM nhanvien 
                 WHERE IDNhanVien = '${req.params.id}'`;
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

const createUser = (req, res) => {
  console.log("createUser");
  const query = `INSERT INTO nhanvien (TaiKhoan, MatKhau, HoTen, DiaChi, NgaySinh, Email, DienThoai, ChucVu)
                  VALUES ("${req.body.TaiKhoan}",
                          "${req.body.MatKhau}", 
                          "${req.body.HoTen}", 
                          "${req.body.DiaChi}",
                     DATE "${req.body.NgaySinh}", 
                          "${req.body.Email}", 
                          "${req.body.DienThoai}", 
                          "${req.body.ChucVu}");`;
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(201).json({
        status: "complete",
        result,
      });
    }
  });
};

const updateUser = (req, res) => {
  const query = `UPDATE 
                     nhanvien 
                 SET TaiKhoan = "${req.body.TaiKhoan}",
                     MatKhau = "${req.body.MatKhau}", 
                     HoTen = "${req.body.HoTen}", 
                     DiaChi = "${req.body.DiaChi}", 
                     NgaySinh = DATE "${req.body.NgaySinh}", 
                     Email = "${req.body.Email}", 
                     DienThoai = "${req.body.DienThoai}", 
                     ChucVu = "${req.body.ChucVu}"
                  WHERE 
                     IDNhanVien = ${req.params.id}
                     `;
  console.log("Update user");
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({
        status: "success",
        result,
      });
    }
  });
};

const deleteUser = (req, res) => {
  console.log("Delete user");
  const query = `DELETE FROM nhanvien 
                 WHERE IDNhanVien = ${req.params.id} `;
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(204).json({
        status: "success",
      });
    }
  });
};

const getUserByUserName = (req, res) => {
  console.log("Get User name");
  const query = `SELECT * FROM nhanvien 
                 WHERE TaiKhoan = '${req.params.TaiKhoan}'`;
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

module.exports = {
  getUserByUserName,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

const connection = require("../database/connectdb");
const getAllClients = (req, res) => {
  connection.query("SELECT * FROM khachhang", (err, result) => {
    if (err) {
      throw new Error();
    } else {
      res.status(200).json({
        result,
      });
    }
  });
};

const getClient = (req, res) => {
  const query = `SELECT * FROM khachhang 
                 WHERE IDKhachHang = '${req.params.id}'`;
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(200).json({
        status: "complete",
        result: result.length == 0 ? null : result,
      });
    }
  });
};

const createClient = (req, res) => {
  const query = `INSERT INTO khachhang (TenKhachHang, DienThoai, Email)
                 VALUES ("${req.body.TenKhachHang}", "${req.body.DienThoai}", "${req.body.Email}")`;
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(201).json({
        status: "complete",
        result,
      });
    }
  });
};

const updateClient = (req, res) => {
  const query = `UPDATE KhachHang 
                 SET TenKhachHang = "${req.body.TenKhachHang}", DienThoai = "${req.body.DienThoai}", Email = "${req.body.Email}"
                 WHERE IDKhachHang = ${req.params.id}`;
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(200).json({
        status: "success",
        result,
      });
    }
  });
};

const deleteClient = (req, res) => {
  const query = `DELETE FROM KhachHang 
                 WHERE IDKhachHang = ${req.params.id} `;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.status(204).json({
      status: "success",
      result,
    });
  });
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};

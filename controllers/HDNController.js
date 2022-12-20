const connection = require("../database/connectdb");

const getAllHDN = (req, res) => {
  connection.query("select * from hoadonnhap", (err, result) => {
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
  const query = `insert into hoadonnhap (IDNhaPhanPhoi, TongTienThuoc, TongThue, TongTienHDN, NgayNhap)
                  values("${req.body.IDNhaPhanPhoi}", "${req.body.TongTienThuoc}", "${req.body.TongThue}", "${req.body.TongTienHDN}", "${req.body.NgayNhap}")`;
  connection.query(query, (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      res.status(201).json({
        status: "success",
        result,
      });
    }
  });
};

const updateHDN = (req, res) => {
  const query = `update hoadonnhap
                 set IDNhaPhanPhoi= "${req.body.IDNhaPhanPhoi}", TongTienThuoc="${req.body.TongTienThuoc}", TongThue="${req.body.TongThue}", TongTienHDN="${req.body.TongTienHDN}", NgayNhap="${req.body.NgayNhap}"
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
  connection.query(
    `delete from hoadonnhap where IDHoaDonNhap = ${req.params.id}`,
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
  getAllHDN,
  getHDN,
  createHDN,
  updateHDN,
  deleteHDN,
};

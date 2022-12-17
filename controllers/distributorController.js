const connection = require("../database/connectdb");

const getAllDistributors = (req, res) => {
  connection.query("SELECT * FROM nhaphanphoi", (err, result) => {
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

const getDistributor = (req, res) => {
  const query = `Select * from nhaphanphoi where IDNhaPhanPhoi = ${req.params.id}`;
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

const createDistributor = (req, res) => {
  const query = `INSERT INTO nhaphanphoi (TenNPP, DiaChi, DienThoai, Fax, Email)
                 VALUES("${req.body.TenNPP}","${req.body.DiaChi}", "${req.body.DienThoai}", "${req.body.Fax}", "${req.body.Email}")`;
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

const updateDistributor = (req, res) => {
  console.log(req.body);
  const query = `Update nhaphanphoi
                 Set TenNPP= "${req.body.TenNPP}", DiaChi= "${req.body.DiaChi}", DienThoai= "${req.body.DienThoai}", Fax= "${req.body.Fax}", Email="${req.body.Email}"
                 where IDNhaPhanPhoi = ${req.params.id}`;
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

const deleteDistributor = (req, res) => {
  const query = `DELETE FROM nhaphanphoi 
                 WHERE IDNhaPhanPhoi = ${req.params.id} `;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.status(204).json({
      status: "success",
      result,
    });
  });
};

module.exports = {
  getAllDistributors,
  getDistributor,
  createDistributor,
  updateDistributor,
  deleteDistributor,
};

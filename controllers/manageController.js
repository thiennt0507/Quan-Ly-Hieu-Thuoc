const connection = require("../database/connectdb");

const getAllDrugs = (req, res) => {
  connection.query("select * from thuoc", (err, result) => {
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

const getDrug = (req, res) => {
  connection.query(
    `select * from thuoc where IDThuoc = ${req.params.id}`,
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

const createDrug = (req, res) => {
  const query = `insert into 
                 thuoc ( 
                        TenThuoc,
                        NSX,
                        NhomThuoc, 
                        SoLuong, 
                        GiaBan, 
                        DonVi, 
                        ThanhPhan, 
                        HamLuong, 
                        CachDung, 
                        HanSuDung, 
                        CongDung, 
                        PhanTacDung, 
                        DangBaoChe, 
                        BaoQuan)
                 values ( 
                         "${req.body.TenThuoc}",
                         "${req.body.NSX}",
                         "${req.body.NhomThuoc}",
                         "${req.body.SoLuong}",
                         "${req.body.GiaBan}",
                         "${req.body.DonVi}",
                         "${req.body.ThanhPhan}",
                         "${req.body.HamLuong}",
                         "${req.body.CachDung}",
                    date "${req.body.HanSuDung}",
                         "${req.body.CongDung}",
                         "${req.body.PhanTacDung}",
                         "${req.body.DangBaoChe}",
                         "${req.body.BaoQuan}")`;
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

const updateDrug = (req, res) => {
  const query = `update thuoc
                 set 
                     TenThuoc = "${req.body.TenThuoc}",
                     NSX = "${req.body.NSX}",
                     NhomThuoc = "${req.body.NhomThuoc}",
                     SoLuong = "${req.body.SoLuong}",
                     GiaBan = "${req.body.GiaBan}",
                     DonVi = "${req.body.DonVi}",
                     ThanhPhan = "${req.body.ThanhPhan}",
                     HamLuong = "${req.body.HamLuong}",
                     CachDung = "${req.body.CachDung}",
                     HanSuDung = "${req.body.HanSuDung}",
                     CongDung = "${req.body.CongDung}",
                     PhanTacDung = "${req.body.PhanTacDung}",
                     DangBaoChe = "${req.body.DangBaoChe}",
                     BaoQuan = "${req.body.BaoQuan}"
                 where IDThuoc = ${req.params.id}`;
  connection.query(query, (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      res.status(200).json({
        status: "OK",
        result,
      });
    }
  });
};

const changeQuantityDrug = (req, res) => {
  const query = `update thuoc set SoLuong = SoLuong ${
    req.params.type === "in" ? "+" : "-"
  } ${req.body.SoLuong} where IDThuoc = ${req.params.id}`;
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      res.status(200).json({
        status: "OK",
        result,
      });
    }
  });
};

const deleteDrug = async (req, res) => {
  const query = `delete from thuoc where IDThuoc = ${req.params.id}`;
  connection.query(query, (err, result) => {
    if (err) {
      throw new Error(err);
    } else {
      res.status(204).json({
        status: "OK",
      });
    }
  });
};

module.exports = {
  getAllDrugs,
  getDrug,
  createDrug,
  updateDrug,
  deleteDrug,
  changeQuantityDrug,
};

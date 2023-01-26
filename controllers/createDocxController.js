const fs = require("fs");
const util = require("util");
const connection = require("../database/connectdb");

const query = util.promisify(connection.query).bind(connection);

const createHDX = async (req, res) => {
  const data_1 = async (id) => {
    const result =
      await query(`select thuoc.TenThuoc as Ten, thuoc.DonVi, chitiethoadonxuat.SoLuong, thuoc.GiaBan as DonGia, (chitiethoadonxuat.SoLuong * thuoc.GiaBan) as ThanhTien from chitiethoadonxuat
      inner join thuoc on thuoc.IDThuoc = chitiethoadonxuat.IDThuoc
      inner join hoadonxuat on hoadonxuat.IDHoaDonXuat = chitiethoadonxuat.IDHoaDonXuat AND hoadonxuat.IDHoaDonXuat = ${id}
    `);
    return result;
  };
  const data_2 = async (id) => {
    const result =
      await query(`select hoadonxuat.NgayXuat, hoadonxuat.IDHoaDonXuat, nhanvien.HoTen, khachhang.TenKhachHang, khachhang.DienThoai, khachhang.Email, hoadonxuat.TongThue as Thue, hoadonxuat.TongTienHDX as TongTien from hoadonxuat
      inner join nhanvien on hoadonxuat.IDNhanVien = nhanvien.IDNhanVien
      INNER join khachhang on hoadonxuat.IDKhachHang = khachhang.IDKhachHang and hoadonxuat.IDHoaDonXuat = ${id}`);
    return result[0];
  };

  const testData = await data_1(req.params.id);
  const HD = await data_2(req.params.id);

  let dmy = new Date(`${HD.NgayXuat}`)
    .toLocaleDateString("en-US", {
      timeZone: "Asia/Jakarta",
    })
    .split("/");

  res.status(200).json({
    status: "success",
    testData,
    HD,
    dmy,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createHDN = async (req, res) => {
  const data_1 = async (id) => {
    const result =
      await query(`select thuoc.TenThuoc as Ten, thuoc.DonVi, chitiethoadonnhap.SoLuong, chitiethoadonnhap.GiaNhap as DonGia, (chitiethoadonnhap.SoLuong * chitiethoadonnhap.GiaNhap) as ThanhTien from chitiethoadonnhap
    inner join thuoc on thuoc.IDThuoc = chitiethoadonnhap.IDThuoc
    inner join hoadonnhap on hoadonnhap.IDHoaDonNhap = chitiethoadonnhap.IDHoaDonNhap AND hoadonnhap.IDHoaDonNhap = ${id}
    `);
    return result;
  };
  const data_2 = async (id) => {
    const result =
      await query(`select hoadonnhap.NgayNhap , hoadonnhap.IDHoaDonNhap, nhanvien.HoTen, nhaphanphoi.TenNPP, nhaphanphoi.DiaChi, nhaphanphoi.Fax, nhaphanphoi.Email , hoadonnhap.TongThue as Thue, hoadonnhap.TongTienHDN as TongTien from hoadonnhap
    inner join nhanvien on hoadonnhap.IDNhanVien = nhanvien.IDNhanVien 
    inner join nhaphanphoi on hoadonnhap.IDNhaPhanPhoi = nhaphanphoi.IDNhaPhanPhoi and hoadonnhap.IDHoaDonNhap = ${id}`);
    return result[0];
  };

  const testData = await data_1(req.params.id);
  console.log(testData);
  const HD = await data_2(req.params.id);
  let dmy = new Date(`${HD.NgayNhap}`)
    .toLocaleDateString("en-US", {
      timeZone: "Asia/Jakarta",
    })
    .split("/");

  res.status(200).json({
    status: "success",
    testData,
    HD,
    dmy,
  });
};

module.exports = { createHDN, createHDX };

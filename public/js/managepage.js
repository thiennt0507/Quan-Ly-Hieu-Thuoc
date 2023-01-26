function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//

$(document).ready(function () {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
});

//  Check login status
//  Check login status
let username = document.getElementsByClassName("dropbtn")[0].innerText;
let logout = document.getElementsByClassName("dropdown-content")[0];

let checklogin = async () => {
  let response = await fetch("http://localhost:3000/loginpage/checklogin", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  let { result } = await response.json();
  if (result === "Logout") {
    alert("You are logout! Please login again");
    window.location = "http://localhost:3000";
  }
};

checklogin();

logout.addEventListener("click", async () => {
  await fetch(`http://localhost:3000/loginpage/logout`, {
    method: "delete",
  });
  window.location = "http://localhost:3000";
});

let addUser = document.getElementsByClassName("btn-success")[1];

let addform = document.getElementById("addEmployeeModal");
let addTenThuoc = addform.getElementsByClassName("form-control")[0];
let addNSX = addform.getElementsByClassName("form-control")[1];
let addNhomThuoc = addform.getElementsByClassName("form-control")[2];
let addSoLuong = addform.getElementsByClassName("form-control")[3];
let addGiaBan = addform.getElementsByClassName("form-control")[4];
let addDonVi = addform.getElementsByClassName("form-control")[5];
let addThanhPhan = addform.getElementsByClassName("form-control")[6];
let addHamLuong = addform.getElementsByClassName("form-control")[7];
let addCachDung = addform.getElementsByClassName("form-control")[8];
let addHanSuDung = addform.getElementsByClassName("form-control")[9];
let addCongDung = addform.getElementsByClassName("form-control")[10];
let addPhanTacDung = addform.getElementsByClassName("form-control")[11];
let addDangBaoChe = addform.getElementsByClassName("form-control")[12];
let addBaoQuan = addform.getElementsByClassName("form-control")[13];
let addSubmit = addform.getElementsByClassName("btn-info")[0];

let deleteUsers = document.getElementsByClassName("btn-danger")[0];
let confirmDelete = document.getElementsByClassName("btn-danger")[1];
let listEdit = document.getElementsByClassName("edit");

let editform = document.getElementById("editEmployeeModal");
let editTenThuoc = editform.getElementsByClassName("form-control")[0];
let editNSX = editform.getElementsByClassName("form-control")[1];
let editNhomThuoc = editform.getElementsByClassName("form-control")[2];
let editSoLuong = editform.getElementsByClassName("form-control")[3];
let editGiaBan = editform.getElementsByClassName("form-control")[4];
let editDonVi = editform.getElementsByClassName("form-control")[5];
let editThanhPhan = editform.getElementsByClassName("form-control")[6];
let editHamLuong = editform.getElementsByClassName("form-control")[7];
let editCachDung = editform.getElementsByClassName("form-control")[8];
let editHanSuDung = editform.getElementsByClassName("form-control")[9];
let editCongDung = editform.getElementsByClassName("form-control")[10];
let editPhanTacDung = editform.getElementsByClassName("form-control")[11];
let editDangBaoChe = editform.getElementsByClassName("form-control")[12];
let editBaoQuan = editform.getElementsByClassName("form-control")[13];
let editSubmit = editform.getElementsByClassName("btn-info")[0];

let listDelete = document.getElementsByClassName("delete");

let deleteform = document.getElementById("deleteEmployeeModal");
let regexFloat = /^\d*(\.\d+)?$/;
let regex = /^\d+$/;
for (let edit of listEdit) {
  edit.addEventListener("click", async () => {
    let id = edit.id.replace("edit", "");
    const response = await fetch(
      `http://localhost:3000/managepage/drugs/${id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    data = (await response.json()).result[0];

    editTenThuoc.value = data.TenThuoc;
    editNSX.value = data.NSX;
    editNhomThuoc.value = data.NhomThuoc;
    editSoLuong.value = data.SoLuong;
    editGiaBan.value = data.GiaBan;
    editDonVi.value = data.DonVi;
    editThanhPhan.value = data.ThanhPhan;
    editHamLuong.value = data.HamLuong;
    editCachDung.value = data.CachDung;
    //
    const date = new Date(data.HanSuDung)
      .toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
      })
      .split("/");
    editHanSuDung.value = `${date[2]}-${
      date[0] >= 10 ? date[0] : "0" + date[0]
    }-${date[1] >= 10 ? date[1] : "0" + date[1]}`;
    editCongDung.value = data.CongDung;
    editPhanTacDung.value = data.PhanTacDung;
    editDangBaoChe.value = data.DangBaoChe;
    editBaoQuan.value = data.BaoQuan;

    editSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        editTenThuoc.value &&
        editNSX.value &&
        editNhomThuoc.value &&
        regex.test(editSoLuong.value) &&
        regexFloat.test(editGiaBan.value) &&
        editDonVi.value &&
        editThanhPhan.value &&
        editHamLuong.value &&
        editCachDung.value &&
        editHanSuDung.value &&
        editCongDung.value &&
        editPhanTacDung.value &&
        editDangBaoChe.value &&
        editBaoQuan.value
      ) {
        fetch(`http://localhost:3000/managepage/drugs/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            TenThuoc: editTenThuoc.value,
            NSX: editNSX.value,
            NhomThuoc: editNhomThuoc.value,
            SoLuong: editSoLuong.value,
            GiaBan: editGiaBan.value,
            DonVi: editDonVi.value,
            ThanhPhan: editThanhPhan.value,
            HamLuong: editHamLuong.value,
            CachDung: editCachDung.value,
            HanSuDung: editHanSuDung.value,
            CongDung: editCongDung.value,
            PhanTacDung: editPhanTacDung.value,
            DangBaoChe: editDangBaoChe.value,
            BaoQuan: editBaoQuan.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        window.location.reload();
      } else {
        alert("Bạn nhập không đúng vui lòng nhập lại");
      }
    });
  });
}

for (let del of listDelete) {
  del.addEventListener("click", async () => {
    let id = del.id.replace("delete", "");
    confirmDelete.onclick = async () => {
      fetch(`http://localhost:3000/managepage/drugs/${id}`, {
        method: "DELETE",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    };
  });
}
addUser.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    addTenThuoc.value &&
    addNSX.value &&
    addNhomThuoc.value &&
    regex.test(addSoLuong.value) &&
    regexFloat.test(addGiaBan.value) &&
    addDonVi.value &&
    addThanhPhan.value &&
    addHamLuong.value &&
    addCachDung.value &&
    addHanSuDung.value &&
    addCongDung.value &&
    addPhanTacDung.value &&
    addDangBaoChe.value &&
    addBaoQuan.value
  ) {
    fetch(`http://localhost:3000/managepage/drugs`, {
      method: "POST",
      body: JSON.stringify({
        TenThuoc: addTenThuoc.value,
        NSX: addNSX.value,
        NhomThuoc: addNhomThuoc.value,
        SoLuong: addSoLuong.value,
        GiaBan: addGiaBan.value,
        DonVi: addDonVi.value,
        ThanhPhan: addThanhPhan.value,
        HamLuong: addHamLuong.value,
        CachDung: addCachDung.value,
        HanSuDung: addHanSuDung.value,
        CongDung: addCongDung.value,
        PhanTacDung: addPhanTacDung.value,
        DangBaoChe: addDangBaoChe.value,
        BaoQuan: addBaoQuan.value,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload();
  } else {
    alert("Bạn nhập không đúng vui lòng nhập lại");
  }
});

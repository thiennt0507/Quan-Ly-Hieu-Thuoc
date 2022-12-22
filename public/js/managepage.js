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
  let response = await fetch("http://localhost:3000/loginpage/role", {
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

// search
let search = document.getElementById("search");
let rows = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
search.addEventListener("keyup", () => {
  for (let i = 0; i < rows.length; i++) {
    if (
      rows[i].children[2].innerText
        .toLowerCase()
        .trim()
        .includes(search.value.toLowerCase().trim())
    ) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
});

let addUser = document.getElementsByClassName("btn-success")[1];

let addform = document.getElementById("addEmployeeModal");
let addMaThuoc = addform.getElementsByClassName("form-control")[0];
let addTenThuoc = addform.getElementsByClassName("form-control")[1];
let addNSX = addform.getElementsByClassName("form-control")[2];
let addNhomThuoc = addform.getElementsByClassName("form-control")[3];
let addSoLuong = addform.getElementsByClassName("form-control")[4];
let addGiaBan = addform.getElementsByClassName("form-control")[5];
let addDonVi = addform.getElementsByClassName("form-control")[6];
let addThanhPhan = addform.getElementsByClassName("form-control")[7];
let addHamLuong = addform.getElementsByClassName("form-control")[8];
let addCachDung = addform.getElementsByClassName("form-control")[9];
let addHanSuDung = addform.getElementsByClassName("form-control")[10];
let addCongDung = addform.getElementsByClassName("form-control")[11];
let addPhanTacDung = addform.getElementsByClassName("form-control")[12];
let addDangBaoChe = addform.getElementsByClassName("form-control")[13];
let addBaoQuan = addform.getElementsByClassName("form-control")[14];
let addSubmit = addform.getElementsByClassName("btn-info")[0];

let deleteUsers = document.getElementsByClassName("btn-danger")[0];
let confirmDelete = document.getElementsByClassName("btn-danger")[1];
let listEdit = document.getElementsByClassName("edit");

let editform = document.getElementById("editEmployeeModal");
let editMaThuoc = editform.getElementsByClassName("form-control")[0];
let editTenThuoc = editform.getElementsByClassName("form-control")[1];
let editNSX = editform.getElementsByClassName("form-control")[2];
let editNhomThuoc = editform.getElementsByClassName("form-control")[3];
let editSoLuong = editform.getElementsByClassName("form-control")[4];
let editGiaBan = editform.getElementsByClassName("form-control")[5];
let editDonVi = editform.getElementsByClassName("form-control")[6];
let editThanhPhan = editform.getElementsByClassName("form-control")[7];
let editHamLuong = editform.getElementsByClassName("form-control")[8];
let editCachDung = editform.getElementsByClassName("form-control")[9];
let editHanSuDung = editform.getElementsByClassName("form-control")[10];
let editCongDung = editform.getElementsByClassName("form-control")[11];
let editPhanTacDung = editform.getElementsByClassName("form-control")[12];
let editDangBaoChe = editform.getElementsByClassName("form-control")[13];
let editBaoQuan = editform.getElementsByClassName("form-control")[14];
let editSubmit = editform.getElementsByClassName("btn-info")[0];

let listDelete = document.getElementsByClassName("delete");

let deleteform = document.getElementById("deleteEmployeeModal");

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

    editMaThuoc.value = data.MaThuoc;
    editTenThuoc.value = data.TenThuoc;
    editNSX.value = data.NSX;
    editNhomThuoc.value = data.NhomThuoc;
    editSoLuong.value = data.SoLuong;
    editGiaBan.value = data.GiaBan;
    editDonVi.value = data.DonVi;
    editThanhPhan.value = data.ThanhPhan;
    editHamLuong.value = data.HamLuong;
    editCachDung.value = data.CachDung;
    editHanSuDung.value = data.HanSuDung.slice(0, 10);
    editCongDung.value = data.CongDung;
    editPhanTacDung.value = data.PhanTacDung;
    editDangBaoChe.value = data.DangBaoChe;
    editBaoQuan.value = data.BaoQuan;

    editSubmit.onclick = () => {
      if (
        editMaThuoc.value &&
        editTenThuoc.value &&
        editNSX.value &&
        editNhomThuoc.value &&
        editSoLuong.value &&
        editGiaBan.value &&
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
            MaThuoc: editMaThuoc.value,
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
      }
    };
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
addUser.addEventListener("click", async () => {
  if (
    addMaThuoc.value &&
    addTenThuoc.value &&
    addNSX.value &&
    addNhomThuoc.value &&
    addSoLuong.value &&
    addGiaBan.value &&
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
        MaThuoc: addMaThuoc.value,
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
  }
});

$(document).ready(function () {
  $("select").selectize({
    sortField: "text",
  });
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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

// CTHDX

let addCTHD = document.getElementsByClassName("btn-success")[1];

let addform = document.getElementById("addEmployeeModal-CTHD");
let addName = addform.getElementsByClassName("form-control")[0];
let addQuantity = addform.getElementsByClassName("form-control")[1];
let addSubmit = addform.getElementsByClassName("btn-info")[0];

let deleteCTHDs = document.getElementsByClassName("btn-danger")[0];
let confirmDelete = document
  .getElementById("deleteEmployeeModal-CTHD")
  .getElementsByClassName("btn-danger")[0];

let listEdit_CTHD = document.getElementsByClassName("edit-CTHD");
let editform = document.getElementById("editEmployeeModal-CTHD");
let editName = editform.getElementsByClassName("form-control")[0];
let editQuantity = editform.getElementsByClassName("form-control")[1];
let editSubmit = editform.getElementsByClassName("btn-info")[0];

let listDelete_CTHD = document.getElementsByClassName("delete-CTHD");

let deleteform = document.getElementById("deleteEmployeeModal-CTHD");

let exportbtn = document.getElementsByClassName("btn-export")[0];
let exportform = document.getElementById("exportEmployeeModal-CTHD");
let exportSubmitBtn = exportform.getElementsByClassName("btn-success")[0];
let exportKH = exportform.getElementsByClassName("form-control")[0];
let exportSumMoneyDrugs = exportform.getElementsByClassName("form-control")[1];
let exportTax = exportform.getElementsByClassName("form-control")[2];
let exportDate = exportform.getElementsByClassName("form-control")[3];

let checkboxEl = document
  .querySelector("tbody")
  .getElementsByClassName("checkbox");
console.log(checkboxEl);
const IDThuocArr = [...checkboxEl].map(
  (el) => el.id.replace("checkboxCTHDX", "") * 1
);
console.log(IDThuocArr);

for (let edit of listEdit_CTHD) {
  edit.addEventListener("click", async () => {
    let id = edit.id.replace("edit", "");
    const tdElement =
      edit.parentElement.parentElement.getElementsByTagName("td");
    // editName.value = tdElement[1].innerText.trim();
    editQuantity.value = tdElement[2].textContent.trim();

    editSubmit.onclick = () => {
      if (editName.value && editQuantity.value) {
        fetch(`http://localhost:3000/sellpage/CTHDXSession/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            TenThuoc: editName.value,
            SoLuong: editQuantity.value,
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

for (let del of listDelete_CTHD) {
  del.addEventListener("click", async () => {
    let id = del.id.replace("delete", "");
    confirmDelete.onclick = async () => {
      fetch(`http://localhost:3000/sellpage/CTHDXSession/${id}`, {
        method: "DELETE",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    };
  });
}

addCTHD.addEventListener("click", async () => {
  if (addName.value && addQuantity.value) {
    fetch(`http://localhost:3000/sellpage/CTHDXSession`, {
      method: "POST",
      body: JSON.stringify({
        TenThuoc: addName.value,
        SoLuong: addQuantity.value,
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

exportbtn.addEventListener("click", () => {
  let tdElement;
  let sum = 0;
  for (let edit of listEdit_CTHD) {
    tdElement = edit.parentElement.parentElement.getElementsByTagName("td");
    sum +=
      Number(tdElement[2].textContent.trim()) *
      Number(tdElement[3].textContent.trim());
  }
  exportSumMoneyDrugs.value = sum;
});

exportSubmitBtn.addEventListener("click", async () => {
  if (listEdit_CTHD.length == 0)
    alert("Hiên tại chưa có thuốc nào được chọn. Vui lòng chọn thêm.");
  else {
    if (
      exportKH.value &&
      exportSumMoneyDrugs.value &&
      exportTax.value &&
      exportDate.value
    ) {
      const response = await fetch("http://localhost:3000/sellpage/HDX", {
        method: "POST",
        body: JSON.stringify({
          IDKhachHang: exportKH.value,
          TongTienThuoc: exportSumMoneyDrugs.value,
          TongThue: exportTax.value,
          TongTienHDX:
            1 * exportSumMoneyDrugs.value * (1 + 1 * exportTax.value),
          NgayXuat: exportDate.value,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const id = data.result.insertId;
      const CTHDXs = document.querySelector("tbody").querySelectorAll("tr");

      await fetch("http://localhost:3000/sellpage/CTHDXSession", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      await Promise.all(
        [...CTHDXs].map(async (el, i) => {
          const tdElement = el.querySelectorAll("td");

          await fetch(`http://localhost:3000/sellpage/CTHDX`, {
            method: "POST",
            body: JSON.stringify({
              IDHoaDonXuat: id,
              IDThuoc: IDThuocArr[i],
              SoLuong: tdElement[2].textContent.trim(),
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          await fetch(
            `http://localhost:3000/managepage/drugs/${IDThuocArr[i]}/de`,
            {
              method: "PATCH",
              body: JSON.stringify({
                SoLuong: tdElement[2].textContent.trim(),
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
        })
      );
    }
    location.reload();
  }
});

// HDX

let listEdit_HDX = document.getElementsByClassName("edit");
let editform_HDX = document.getElementById("editEmployeeModal");
let editKH_HDX = editform_HDX.getElementsByClassName("form-control")[0];
let editSumMoneyDrugs_HDX =
  editform_HDX.getElementsByClassName("form-control")[1];
let editTax_HDX = editform_HDX.getElementsByClassName("form-control")[2];
let editDate_HDX = editform_HDX.getElementsByClassName("form-control")[3];
let editSubmit_HDX = editform_HDX.getElementsByClassName("btn-info")[0];

let listDelete_HDX = document.getElementsByClassName("delete");
let deleteform_HDX = document.getElementById("deleteEmployeeModal");
let confirmDelete_HDX = document
  .getElementById("deleteEmployeeModal")
  .getElementsByClassName("btn-danger")[0];

for (let edit of listEdit_HDX) {
  edit.addEventListener("click", () => {
    let id = edit.id.replace("editHDX", "");
    const tdElement =
      edit.parentElement.parentElement.getElementsByTagName("td");
    editSumMoneyDrugs_HDX.value = tdElement[2].textContent.trim();
    editTax_HDX.value = tdElement[3].textContent.trim();
    editDate_HDX.value = tdElement[5].textContent.trim();
    editSubmit_HDX.addEventListener("click", async (e) => {
      e.preventDefault();
      if (
        editKH_HDX.value &&
        editSumMoneyDrugs_HDX.value &&
        editTax_HDX.value &&
        editDate_HDX.value
      ) {
        const body = JSON.stringify({
          IDKhachHang: editKH_HDX.value,
          TongThue: editTax_HDX.value,
          TongTienHDX:
            editSumMoneyDrugs_HDX.value * (1 + editTax_HDX.value * 1),
          NgayNhap: editDate_HDX.value,
        });
        await fetch(`http://localhost:3000/sellpage/HDX/${id}`, {
          method: "PATCH",
          body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        window.location.reload();
      }
    });
  });
}

for (let del of listDelete_HDX) {
  del.addEventListener("click", async () => {
    let id = del.id.replace("deleteHDX", "");
    confirmDelete_HDX.onclick = async (e) => {
      await fetch(`http://localhost:3000/sellpage/HDX/${id}`, {
        method: "DELETE",
      }).then((res) => console.log(res));
      window.location.reload();
    };
  });
}

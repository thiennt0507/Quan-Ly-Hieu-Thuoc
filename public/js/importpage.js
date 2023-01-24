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

// Pagination
// const pagination = document.getElementsByClassName("pagination")[0];
// const pages = pagination.getElementsByClassName("page-item");
// const hdnPage = document.getElementsByClassName("hdn-page")[0];
// const tables = hdnPage.getElementsByTagName("tbody");
// let activeTable = tables[0];

// let activePage = pagination.getElementsByClassName("active")[0];
// let thisPageID = 0;
// let beforeTab = 1;
// let afterTab = 2;

// const resetStatePage = () => {
//   for (let index in pages) {
//     if (pages[index] == activePage) {
//       thisPageID = index;
//       if (index >= 2) {
//         console.log(index);
//         pages[0].classList.contains("disabled")
//           ? pages[0].classList.toggle("disabled")
//           : pages[0].classList;
//         console.log(pages[0].classList);
//       }
//       afterTab = 2;
//       beforeTab = 1;
//       if (thisPageID == 1) {
//         pages[0].classList.contains("disabled")
//           ? pages[0].classList
//           : pages[0].classList.toggle("disabled");
//         afterTab = 3;
//         beforeTab = 0;
//       }
//       if (thisPageID == pages.length - 3) {
//         afterTab = 1;
//         beforeTab = 2;
//       }
//       if (thisPageID == pages.length - 2) {
//         afterTab = 1;
//         beforeTab = 3;
//       }
//       for (let i = 1; i < pages.length - 1; i++) {
//         if (i >= thisPageID * 1 - beforeTab && i <= thisPageID * 1 + afterTab) {
//           pages[i].style.display = "";
//         } else if (i <= pages.length - 2) {
//           pages[i].style.display = "none";
//         }
//       }

//       for (let index in tables) {
//         if (index == thisPageID - 1) {
//           activeTable.style.display = "none";
//           tables[index].style.display = "";
//           activeTable = tables[index];
//         }
//       }
//     }
//   }
// };
// resetStatePage();
// for (let index in pages) {
//   if (index == 0) {
//     pages[index].addEventListener("click", () => {
//       if (thisPageID > 1) {
//         activePage.classList.toggle("active");
//         pages[thisPageID - 1].classList.toggle("active");
//         activePage = pages[thisPageID - 1];
//         resetStatePage();
//       }
//     });
//   }
//   if (index == pages.length * 1 - 1) {
//     pages[index].addEventListener("click", () => {
//       if (thisPageID < pages.length * 1 - 2) {
//         activePage.classList.toggle("active");
//         pages[thisPageID * 1 + 1].classList.toggle("active");
//         activePage = pages[thisPageID * 1 + 1];
//         console.log(activePage.textContent);
//         resetStatePage();
//       }
//     });
//   }
//   if (index != 0 && index <= pages.length * 1 - 2) {
//     pages[index].addEventListener("click", () => {
//       activePage.classList.toggle("active");
//       pages[index].classList.toggle("active");
//       activePage = pages[index];
//       resetStatePage();
//     });
//   }
// }

// Chi tiết hóa đơn

let addCTHD = document.getElementsByClassName("btn-success")[1];

let addform = document.getElementById("addEmployeeModal-CTHD");
let addName = addform.getElementsByClassName("form-control")[0];
let addQuantity = addform.getElementsByClassName("form-control")[1];
let addPrice = addform.getElementsByClassName("form-control")[2];
let addSubmit = addform.getElementsByClassName("btn-info")[0];

let deleteCTHDs = document.getElementsByClassName("btn-danger")[0];
let confirmDelete = document
  .getElementById("deleteEmployeeModal-CTHD")
  .getElementsByClassName("btn-danger")[0];

let listEdit_CTHD = document.getElementsByClassName("edit-CTHD");
let editform = document.getElementById("editEmployeeModal-CTHD");
let editName = editform.getElementsByClassName("form-control")[0];
let editQuantity = editform.getElementsByClassName("form-control")[1];
let editPrice = editform.getElementsByClassName("form-control")[2];
let editSubmit = editform.getElementsByClassName("btn-info")[0];

let listDelete_CTHD = document.getElementsByClassName("delete-CTHD");

let deleteform = document.getElementById("deleteEmployeeModal-CTHD");

let exportbtn = document.getElementsByClassName("btn-export")[0];
let exportform = document.getElementById("exportEmployeeModal-CTHD");
let exportSubmitBtn = exportform.getElementsByClassName("btn-success")[0];
let exportNPP = exportform.getElementsByClassName("form-control")[0];
let exportSumMoneyDrugs = exportform.getElementsByClassName("form-control")[1];
let exportTax = exportform.getElementsByClassName("form-control")[2];
let exportDate = exportform.getElementsByClassName("form-control")[3];

let checkboxEl = document
  .querySelector("tbody")
  .getElementsByClassName("checkbox");
const IDThuocArr = [...checkboxEl].map(
  (el) => el.id.replace("checkboxCTHDN", "") * 1
);
console.log(IDThuocArr);

for (let edit of listEdit_CTHD) {
  edit.addEventListener("click", async () => {
    let id = edit.id.replace("edit", "");
    const tdElement =
      edit.parentElement.parentElement.getElementsByTagName("td");
    // editName.value = tdElement[1].innerText.trim();
    editQuantity.value = tdElement[2].textContent.trim();
    editPrice.value = tdElement[3].textContent.trim();

    editSubmit.onclick = () => {
      if (editName.value && editQuantity.value && editPrice.value) {
        fetch(`http://localhost:3000/importpage/CTHDNSession/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            TenThuoc: editName.value,
            SoLuong: editQuantity.value,
            GiaNhap: editPrice.value,
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
      fetch(`http://localhost:3000/importpage/CTHDNSession/${id}`, {
        method: "DELETE",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    };
  });
}

addCTHD.addEventListener("click", async () => {
  if (addName.value && addQuantity.value && addPrice.value) {
    fetch(`http://localhost:3000/importpage/CTHDNSession`, {
      method: "POST",
      body: JSON.stringify({
        TenThuoc: addName.value,
        SoLuong: addQuantity.value,
        GiaNhap: addPrice.value,
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
      exportNPP.value &&
      exportSumMoneyDrugs.value &&
      exportTax.value &&
      exportNPP.value &&
      exportDate.value
    ) {
      const response = await fetch("http://localhost:3000/importpage/HDN", {
        method: "POST",
        body: JSON.stringify({
          IDNhaPhanPhoi: exportNPP.value,
          TongTienThuoc: exportSumMoneyDrugs.value,
          TongThue: exportTax.value,
          TongTienHDN:
            1 * exportSumMoneyDrugs.value * (1 + 1 * exportTax.value),
          NgayNhap: exportDate.value,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const id = data.result.insertId;
      const CTHDNs = document.querySelector("tbody").querySelectorAll("tr");
      await fetch("http://localhost:3000/importpage/CTHDNSession", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await Promise.all(
        [...CTHDNs].map(async (el, i) => {
          const tdElement = el.querySelectorAll("td");
          await fetch(`http://localhost:3000/importpage/CTHDN`, {
            method: "POST",
            body: JSON.stringify({
              IDHoaDonNhap: id,
              IDThuoc: IDThuocArr[i],
              SoLuong: tdElement[2].textContent.trim(),
              GiaNhap: tdElement[3].textContent.trim(),
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          console.log("Ok");
          await fetch(
            `http://localhost:3000/managepage/drugs/${IDThuocArr[i]}/in`,
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

// Hóa đơn nhập

let listEdit_HDN = document.getElementsByClassName("edit");
let editform_HDN = document.getElementById("editEmployeeModal");
let editNPP_HDN = editform_HDN.getElementsByClassName("form-control")[0];
let editSumMoneyDrugs_HDN =
  editform_HDN.getElementsByClassName("form-control")[1];
let editTax_HDN = editform_HDN.getElementsByClassName("form-control")[2];
let editDate_HDN = editform_HDN.getElementsByClassName("form-control")[3];
let editSubmit_HDN = editform_HDN.getElementsByClassName("btn-info")[0];

let listDelete_HDN = document.getElementsByClassName("delete");
let deleteform_HDN = document.getElementById("deleteEmployeeModal");
let confirmDelete_HDN = document
  .getElementById("deleteEmployeeModal")
  .getElementsByClassName("btn-danger")[0];

for (let edit of listEdit_HDN) {
  edit.addEventListener("click", () => {
    let id = edit.id.replace("editHDN", "");
    const tdElement =
      edit.parentElement.parentElement.getElementsByTagName("td");
    editSumMoneyDrugs_HDN.value = tdElement[2].textContent.trim();
    editTax_HDN.value = tdElement[3].textContent.trim();
    const data = tdElement[5].textContent.trim();
    editDate_HDN.value = tdElement[5].textContent.trim();
    editSubmit_HDN.addEventListener("click", async (e) => {
      e.preventDefault();
      if (
        editNPP_HDN.value &&
        editSumMoneyDrugs_HDN.value &&
        editTax_HDN.value &&
        editDate_HDN.value
      ) {
        const body = JSON.stringify({
          IDNhaPhanPhoi: editNPP_HDN.value,
          TongThue: editTax_HDN.value,
          TongTienHDN:
            editSumMoneyDrugs_HDN.value * (1 + editTax_HDN.value * 1),
          NgayNhap: editDate_HDN.value,
        });
        await fetch(`http://localhost:3000/importpage/HDN/${id}`, {
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

for (let del of listDelete_HDN) {
  del.addEventListener("click", async () => {
    let id = del.id.replace("deleteHDN", "");
    confirmDelete_HDN.onclick = async (e) => {
      await fetch(`http://localhost:3000/importpage/HDN/${id}`, {
        method: "DELETE",
      }).then((res) => console.log(res));
      window.location.reload();
    };
  });
}

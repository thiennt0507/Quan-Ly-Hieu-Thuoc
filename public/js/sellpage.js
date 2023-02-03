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
    alert("Bạn hiện không đăng nhập! Vui lòng đăng nhập trở lại");
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
let regexFloat = /^\d*(\.\d+)?$/;
let regex = /^\d+$/;
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
    editSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      if (editName.value && regex.test(editQuantity.value)) {
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
      } else {
        alert("Bạn nhập không đúng vui lòng nhập lại");
      }
    });
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

addCTHD.addEventListener("click", async (e) => {
  e.preventDefault();
  if (addName.value && regex.test(addQuantity.value)) {
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
  } else {
    alert("Bạn nhập không đúng vui lòng nhập lại");
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

exportSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (listEdit_CTHD.length == 0)
    alert("Hiên tại chưa có thuốc nào được chọn. Vui lòng chọn thêm.");
  else {
    if (
      exportKH.value &&
      exportSumMoneyDrugs.value &&
      regexFloat.test(exportTax.value) &&
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
      location.reload();
    } else {
      alert("Bạn nhập không đúng vui lòng nhập lại");
    }
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

let listExport_HDX = document.getElementsByClassName("export");
let confirmExport_HDX = document
  .getElementById("exportEmployeeModal")
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
        regexFloat.test(editTax_HDX.value) &&
        editDate_HDX.value
      ) {
        const body = JSON.stringify({
          IDKhachHang: editKH_HDX.value,
          TongThue: editTax_HDX.value,
          TongTienHDX:
            editSumMoneyDrugs_HDX.value * (1 + editTax_HDX.value * 1),
          NgayXuat: editDate_HDX.value,
        });
        await fetch(`http://localhost:3000/sellpage/HDX/${id}`, {
          method: "PATCH",
          body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        window.location.reload();
      } else {
        alert("Bạn nhập không đúng vui lòng nhập lại");
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

for (let ex of listExport_HDX) {
  ex.addEventListener("click", async () => {
    console.log(ex.id);
    let id = ex.id.replace("exportHDX", "");
    console.log(id);
    confirmExport_HDX.addEventListener("click", async (e) => {
      e.preventDefault();
      const res = await fetch(
        `http://localhost:3000/createbill/hoadonxuat/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const { testData, HD, dmy } = await res.json();

      const table = new docx.Table({
        rows: [
          new docx.TableRow({
            children: [
              new docx.TableCell({
                children: [
                  new docx.Paragraph({
                    children: [
                      new docx.TextRun({
                        text: `STT`,
                        size: 24,
                        font: "arial",
                        bold: true,
                      }),
                    ],
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
                verticalAlign: docx.VerticalAlign.CENTER,
              }),
              new docx.TableCell({
                children: [
                  new docx.Paragraph({
                    children: [
                      new docx.TextRun({
                        text: `Tên Thuốc`,
                        size: 24,
                        font: "arial",
                        bold: true,
                      }),
                    ],
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
                verticalAlign: docx.VerticalAlign.CENTER,
              }),
              new docx.TableCell({
                children: [
                  new docx.Paragraph({
                    children: [
                      new docx.TextRun({
                        text: `Đơn vị`,
                        size: 24,
                        font: "arial",
                        bold: true,
                      }),
                    ],
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
                verticalAlign: docx.VerticalAlign.CENTER,
              }),
              new docx.TableCell({
                children: [
                  new docx.Paragraph({
                    children: [
                      new docx.TextRun({
                        text: `Số lượng`,
                        size: 24,
                        font: "arial",
                        bold: true,
                      }),
                    ],
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
                verticalAlign: docx.VerticalAlign.CENTER,
              }),
              new docx.TableCell({
                children: [
                  new docx.Paragraph({
                    children: [
                      new docx.TextRun({
                        text: `Đơn giá (VND)`,
                        size: 24,
                        font: "arial",
                        bold: true,
                      }),
                    ],
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
                verticalAlign: docx.VerticalAlign.CENTER,
              }),
              new docx.TableCell({
                children: [
                  new docx.Paragraph({
                    children: [
                      new docx.TextRun({
                        text: `Thành tiền (VND)`,
                        font: "arial",
                        size: 24,
                        bold: true,
                      }),
                    ],
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
                verticalAlign: docx.VerticalAlign.CENTER,
              }),
            ],
            tableHeader: true,
            height: { value: 500 },
          }),
        ],
        width: {
          size: 8500,
          type: docx.WidthType.DXA,
        },
      });

      //
      testData.map((data, index) => {
        const tableRow = new docx.TableRow({
          children: [
            new docx.TableCell({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: `${index + 1}`,
                      size: 20,
                    }),
                  ],
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
              verticalAlign: docx.VerticalAlign.CENTER,
            }),
            new docx.TableCell({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: `${data.Ten}`,
                      size: 20,
                    }),
                  ],
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
              verticalAlign: docx.VerticalAlign.CENTER,
            }),
            new docx.TableCell({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: `${data.DonVi}`,
                      size: 20,
                    }),
                  ],
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
              verticalAlign: docx.VerticalAlign.CENTER,
            }),
            new docx.TableCell({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: `${data.SoLuong}`,
                      size: 20,
                    }),
                  ],
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
              verticalAlign: docx.VerticalAlign.CENTER,
            }),
            new docx.TableCell({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: `${data.DonGia}`,
                      size: 20,
                    }),
                  ],
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
              verticalAlign: docx.VerticalAlign.CENTER,
            }),
            new docx.TableCell({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: `${data.ThanhTien}`,
                      size: 20,
                    }),
                  ],
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
              verticalAlign: docx.VerticalAlign.CENTER,
            }),
          ],
          height: { value: 300 },
        });

        table.root.push(tableRow);
      });

      const doc = new docx.Document({
        sections: [
          {
            properties: {},
            children: [
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Hóa đơn bán thuốc`,
                    size: 40,
                    bold: true,
                    font: "arial",
                  }),
                ],
                heading: docx.HeadingLevel.TITLE,
                alignment: docx.AlignmentType.CENTER,
                spacing: {
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Ngày `,
                    size: 32,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${dmy[1]} `,
                    size: 32,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `tháng `,
                    size: 32,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${dmy[0]} `,
                    size: 32,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `năm `,
                    size: 32,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${dmy[2]}`,
                    size: 32,
                    font: "arial",
                  }),
                ],
                alignment: docx.AlignmentType.CENTER,
                spacing: {
                  after: 500,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Hiệu thuốc số 09                             Mã số hóa đơn: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.IDHoaDonXuat}`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Tên nhân viên: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.HoTen}`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Tên khách hàng: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.TenKhachHang}`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Số điện thoại: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.DienThoai}`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Email: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.Email}`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              table,
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Thuế: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.Thue}`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  before: 200,
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Tổng cộng: `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                  new docx.TextRun({
                    text: `${HD.TongTien}   VND`,
                    size: 28,
                    font: "arial",
                  }),
                ],
                spacing: {
                  before: 200,
                  after: 100,
                },
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Nhân viên lập phiếu                                      Khách hàng `,
                    size: 28,
                    bold: true,
                    font: "arial",
                  }),
                ],
                spacing: {
                  before: 500,
                  after: 100,
                },
              }),
            ],
          },
        ],
      });

      console.log(doc);

      docx.Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `Hoa_Don_Xuat_${HD.IDHoaDonXuat}_${Date.now()}`);
        console.log("Document created successfully");
      });
    });
  });
}

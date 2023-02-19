function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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

let addUser = document.getElementsByClassName("btn-success")[1];

let addform = document.getElementById("addEmployeeModal");
let addName = addform.getElementsByClassName("form-control")[0];
let addUserName = addform.getElementsByClassName("form-control")[1];
let addPassword = addform.getElementsByClassName("form-control")[2];
let addEmail = addform.getElementsByClassName("form-control")[3];
let addAddress = addform.getElementsByClassName("form-control")[4];
let addBirth = addform.getElementsByClassName("form-control")[5];
let addPhone = addform.getElementsByClassName("form-control")[6];
let addRole = addform.getElementsByClassName("form-control")[7];
let addSubmit = addform.getElementsByClassName("btn-info")[0];

let deleteUsers = document.getElementsByClassName("btn-danger")[0];
let confirmDelete = document.getElementsByClassName("btn-danger")[1];
let listEdit = document.getElementsByClassName("edit");

let editform = document.getElementById("editEmployeeModal");
let editName = editform.getElementsByClassName("form-control")[0];
let editUserName = editform.getElementsByClassName("form-control")[1];
let editPassword = editform.getElementsByClassName("form-control")[2];
let editEmail = editform.getElementsByClassName("form-control")[3];
let editAddress = editform.getElementsByClassName("form-control")[4];
let editBirth = editform.getElementsByClassName("form-control")[5];
let editPhone = editform.getElementsByClassName("form-control")[6];
let editRole = editform.getElementsByClassName("form-control")[7];
let editSubmit = editform.getElementsByClassName("btn-info")[0];

let listDelete = document.getElementsByClassName("delete");

let deleteform = document.getElementById("deleteEmployeeModal");

for (let edit of listEdit) {
  edit.addEventListener("click", async () => {
    checklogin();
    let id = edit.id.replace("edit", "");
    const response = await fetch(
      `http://localhost:3000/userspage/users/${id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    data = (await response.json()).result[0];

    editName.value = data.HoTen;
    editUserName.value = data.TaiKhoan;
    editPassword.value = data.MatKhau;
    editEmail.value = data.Email;
    editAddress.value = data.DiaChi;
    //
    const date = new Date(data.NgaySinh)
      .toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
      })
      .split("/");
    console.log(
      new Date(data.NgaySinh).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
      })
    );
    editBirth.value = `${date[2]}-${date[1] >= 10 ? date[1] : "0" + date[1]}-${
      date[0] >= 10 ? date[0] : "0" + date[0]
    }`;
    editPhone.value = data.DienThoai;
    editRole.value = data.ChucVu;

    editSubmit.onclick = () => {
      if (
        editName.value &&
        editUserName.value &&
        editPassword.value &&
        editRole.value &&
        editAddress.value &&
        editBirth.value &&
        editPhone.value &&
        editEmail.value
      ) {
        fetch(`http://localhost:3000/userspage/users/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            TaiKhoan: editUserName.value,
            MatKhau: editPassword.value,
            HoTen: editName.value,
            DiaChi: editAddress.value,
            NgaySinh: editBirth.value,
            Email: editEmail.value,
            DienThoai: editPhone.value,
            ChucVu: editRole.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        window.location.reload();
      } else {
        alert("error");
      }
    };
  });
}

for (let del of listDelete) {
  del.addEventListener("click", async () => {
    checklogin();
    let id = del.id.replace("delete", "");
    confirmDelete.onclick = async () => {
      fetch(`http://localhost:3000/userspage/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    };
  });
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

addUser.addEventListener("click", async () => {
  checklogin();
  if (
    addName.value &&
    addUserName.value &&
    addPassword.value &&
    addAddress.value &&
    addBirth.value &&
    addPhone.value &&
    validateEmail(addEmail.value) &&
    addRole.value
  ) {
    fetch(`http://localhost:3000/userspage/users`, {
      method: "POST",
      body: JSON.stringify({
        TaiKhoan: addUserName.value,
        MatKhau: addPassword.value,
        HoTen: addName.value,
        DiaChi: addAddress.value,
        NgaySinh: addBirth.value,
        Email: addEmail.value,
        DienThoai: addPhone.value,
        ChucVu: addRole.value,
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

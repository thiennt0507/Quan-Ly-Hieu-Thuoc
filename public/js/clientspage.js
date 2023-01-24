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

// Check login

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

//

let addClient = document.getElementsByClassName("btn-success")[1];

let addform = document.getElementById("addEmployeeModal");
let addName = addform.getElementsByClassName("form-control")[0];
let addPhone = addform.getElementsByClassName("form-control")[1];
let addEmail = addform.getElementsByClassName("form-control")[2];
let addSubmit = addform.getElementsByClassName("btn-info")[0];

let deleteClients = document.getElementsByClassName("btn-danger")[0];
let confirmDelete = document.getElementsByClassName("btn-danger")[1];
let listEdit = document.getElementsByClassName("edit");

let editform = document.getElementById("editEmployeeModal");
let editName = editform.getElementsByClassName("form-control")[0];
let editPhone = editform.getElementsByClassName("form-control")[1];
let editEmail = editform.getElementsByClassName("form-control")[2];
let editSubmit = editform.getElementsByClassName("btn-info")[0];

let listDelete = document.getElementsByClassName("delete");

let deleteform = document.getElementById("deleteEmployeeModal");

for (let edit of listEdit) {
  edit.addEventListener("click", async () => {
    let id = edit.id.replace("edit", "");
    const tdElement =
      edit.parentElement.parentElement.getElementsByTagName("td");
    editName.value = tdElement[1].textContent.trim();
    editPhone.value = tdElement[3].textContent.trim();
    editEmail.value = tdElement[2].textContent.trim();
    editSubmit.onclick = () => {
      if (editName.value && editPhone.value && editEmail.value) {
        fetch(`http://localhost:3000/clientpage/clients/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            TenKhachHang: editName.value,
            DienThoai: editPhone.value,
            Email: editEmail.value,
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
      fetch(`http://localhost:3000/clientpage/clients/${id}`, {
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

addClient.addEventListener("click", async () => {
  if (addName.value && addPhone.value && validateEmail(addEmail.value)) {
    fetch(`http://localhost:3000/clientpage/clients`, {
      method: "POST",
      body: JSON.stringify({
        TenKhachHang: addName.value,
        DienThoai: addPhone.value,
        Email: addEmail.value,
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

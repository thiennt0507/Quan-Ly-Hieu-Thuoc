let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quanlyhieuthuoc",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else console.log("Ket noi database thanh cong");
});

module.exports = connection;

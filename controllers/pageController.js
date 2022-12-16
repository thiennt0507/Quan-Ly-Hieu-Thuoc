const clientController = require("../controllers/clientController");
const fetch = require("node-fetch");

const getHomePage = (req, res) => {
  res.render("homepage.ejs");
};

const getClientsPage = async (req, res) => {
  // Get data client
  let response = await fetch("http://localhost:3000/clientpage/clients", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let data = await response.json();
  let { result } = data;

  response = await fetch("http://localhost:3000/loginpage", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result.length == 0 ? null : data.result;
  res.render("clientspage.ejs", {
    clients: result,
    currentUser: result_1,
  });
};
const getImportPage = (req, res) => {
  res.render("importpage.ejs");
};
const getManagePage = (req, res) => {
  res.render("manage.ejs");
};
const getSellPage = (req, res) => {
  res.render("sellpage.ejs");
};
const getStatisticalPage = (req, res) => {
  res.render("statisticalpage.ejs");
};

const getUsersPage = async (req, res) => {
  let response = await fetch("http://localhost:3000/userspage/users", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let data = await response.json();
  let { result } = data;

  response = await fetch("http://localhost:3000/loginpage", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result.length == 0 ? null : data.result;
  res.render("userspage.ejs", {
    users: result,
    currentUser: result_1,
  });
};
const getLoginPage = (req, res) => {
  res.render("login.ejs");
};

module.exports = {
  getHomePage,
  getManagePage,
  getClientsPage,
  getImportPage,
  getSellPage,
  getStatisticalPage,
  getUsersPage,
  getLoginPage,
};

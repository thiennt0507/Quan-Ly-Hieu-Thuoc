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

const getImportPage = async (req, res) => {
  let response = await fetch("http://localhost:3000/importpage/HDN", {
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

  response = await fetch("http://localhost:3000/distributorpage/distributors", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_2 = data.result;
  console.log(result_2.length);

  res.render("importpage.ejs", {
    HDN: result,
    currentUser: result_1,
    NPP: result_2,
  });
};

const getManagePage = async (req, res) => {
  let response = await fetch("http://localhost:3000/managepage/drugs", {
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
  res.render("managepage.ejs", {
    drugs: result,
    currentUser: result_1,
  });
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

const getDistributorsPage = async (req, res) => {
  let response = await fetch(
    "http://localhost:3000/distributorpage/distributors",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
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
  res.render("distributorspage.ejs", {
    distributors: result,
    currentUser: result_1,
  });
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
  getDistributorsPage,
};

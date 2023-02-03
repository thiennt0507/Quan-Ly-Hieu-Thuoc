const clientController = require("../controllers/clientController");
const fetch = require("node-fetch");

const getHomePage = async (req, res) => {
  let response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;

  res.render("homepage.ejs", {
    currentUser: result_1,
  });
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

  response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;

  res.render("clientspage.ejs", {
    clients: result,
    currentUser: result_1,
  });
};

const getImportPage = async (req, res) => {
  // Get all HDN
  let response = await fetch("http://localhost:3000/importpage/HDN", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let data = await response.json();
  let { result } = data;

  response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;

  // Get all Nha phan phoi
  response = await fetch("http://localhost:3000/distributorpage/distributors", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_2 = data.result;

  // session CTHDN
  response = await fetch("http://localhost:3000/importpage/CTHDNSession/", {
    method: "GET",
    headers: {
      "Accept-Encoding": "gzip,def",
      Connection: "keep-alive",
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_3 = data.result ? data.result : [];

  // get all drugs
  response = await fetch("http://localhost:3000/managepage/drugs", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_4 = data.result;

  res.render("importpage.ejs", {
    HDN: result,
    currentUser: result_1,
    NPP: result_2,
    CTHDN_SESSIONS: result_3,
    Drugs: result_4,
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

  response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;

  res.render("managepage.ejs", {
    drugs: result,
    currentUser: result_1,
  });
};

const getSellPage = async (req, res) => {
  // Get All HDX
  let response = await fetch(`http://localhost:3000/sellpage/HDX`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let { result } = data;

  // Get Current user
  response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  data = await response.json();
  let result_1 = data.result;

  // Get all Khach Hang
  response = await fetch("http://localhost:3000/clientpage/clients", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_2 = data.result;

  // session CTHDN
  response = await fetch("http://localhost:3000/sellpage/CTHDXSession", {
    method: "GET",
    headers: {
      "Accept-Encoding": "gzip,def",
      Connection: "keep-alive",
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_3 = data.result ? data.result : [];

  // get all drugs
  response = await fetch("http://localhost:3000/managepage/drugs", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  data = await response.json();
  let result_4 = data.result;

  res.render("sellpage.ejs", {
    HDX: result,
    currentUser: result_1,
    Clients: result_2,
    CTHDX_SESSIONS: result_3,
    Drugs: result_4,
  });
};

const getStatisticalPage = async (req, res) => {
  let response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;

  res.render("statisticalpage.ejs", {
    currentUser: result_1,
  });
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
  console.log(result);

  response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;
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

  response = await fetch(`http://localhost:3000/loginpage/checklogin`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  data = await response.json();
  let result_1 = data.result;

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

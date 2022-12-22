const express = require("express");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const connection = require("./database/connectdb");
const path = require("path");

const pageRouter = require("./routes/pageRouter");
const clientRouter = require("./routes/clientRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");
const distributorRouter = require("./routes/distributorRouter");
const manageRouter = require("./routes/manageRouter");
const CTHDNRouter = require("./routes/CTHDNRouter");
const HDNRouter = require("./routes/HDNRouter");
const CTHDNSessionRouter = require("./routes/CTHDNSessionRouter");

const app = express();

// app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    cookie: { maxAge: 864000 },
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static file
app.use(express.static(`${__dirname}/public`));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/js", express.static(`${__dirname}/public/js`));
app.use("/view", express.static(`${__dirname}/public/view`));
app.use("/img", express.static(`${__dirname}/public/img`));

// set view
app.set("views", `./public/views`);
app.set("view engine", "ejs");

app.use("", pageRouter);

// use session middle

app.use("/clientpage/clients", clientRouter);

// userRouter
app.use("/userspage/users", userRouter);

// UserLogin
app.use("/loginpage", loginRouter);

// distributor routes
app.use("/distributorpage/distributors", distributorRouter);

// manage routes
app.use("/managepage/drugs", manageRouter);

// cthdn routes
app.use("/importpage/CTHDN", CTHDNRouter);

// hdn routes
app.use("/importpage/HDN", HDNRouter);

// ctdhn routes
app.use("/importpage/CTHDNSession", CTHDNSessionRouter);

module.exports = app;

const express = require("express");
const session = require("express-session");
const connection = require("./database/connectdb");
const path = require("path");

const pageRouter = require("./routes/pageRouter");
const clientRouter = require("./routes/clientRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");
const distributorRouter = require("./routes/distributorRouter");
const manageRouter = require("./routes/manageRouter");
const CTHDNRouter = require("./routes/CTHDNRouter");
const CTHDXRouter = require("./routes/CTHDXRouter");
const HDNRouter = require("./routes/HDNRouter");
const HDXRouter = require("./routes/HDXRouter");
const CTHDNSessionRouter = require("./routes/CTHDNSessionRouter");
const CTHDXSessionRouter = require("./routes/CTHDXSessionRouter");
const createDocxRouter = require("./routes/createDocxRouter");
const emailRouter = require("./routes/emailRouter");
const app = express();

// app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    cookie: { maxAge: 864000 },
    saveUninitialized: false,
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

// cthdx routes
app.use("/sellpage/CTHDX", CTHDXRouter);

// hdx routes
app.use("/sellpage/HDX", HDXRouter);

app.use("/sellpage/CTHDXSession", CTHDXSessionRouter);

// create hoa don

app.use("/createbill", createDocxRouter);

// create bao cao
app.use("/sendemail", emailRouter);

module.exports = app;

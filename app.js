const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const indexRouter = require("./routes/index");

let dbconnect = require("./config/dbconfig");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// let corsOptins = {
//   origin: "*",
//   crossOrigin: true,
//   credentials: true,
// };
let corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  crossorigin: true,
  credentials: true,
};
app.use(cors(corsOptions));
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// };
// app.use(allowCrossDomain);
app.use(morgan("dev"));
require("dotenv").config();
app.use("/", indexRouter);
dbconnect.connect(
  app.listen(process.env.PORT, () => {
    console.log("listening at port ", process.env.PORT);
  })
);

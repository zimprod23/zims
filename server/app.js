const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const db = config.get("mongoURI");
const cookieParser = require("cookie-parser");

const app = express();

//utility
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Database Connection
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("MongoDB is not connected"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Who we are givin access
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-auth-token"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(201).json({});
  }
  next();
});

//Route Configuration
const ProductRoute = require("./Routes/products");
const UserRoute = require("./Routes/user");
app.use("/api/product", ProductRoute);
app.use("/api/user", UserRoute);

module.exports = app;

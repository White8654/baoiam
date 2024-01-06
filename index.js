const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
// Use body-parser middleware to parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("view engine", "ejs");

// app.set("views", __dirname + "views");

app.use(express.static("public"));

app.use(multer().any());
// "mongodb+srv://poushali26:0U8on2StHP5FNKo2@cluster0.jwwwcc8.mongodb.net/baoiam"
mongoose
  .connect(
    "mongodb+srv://sohan_666:iiest@cluster0.5k2fixv.mongodb.net/?retryWrites=true&w=majority"
  )

  .then(() => console.log("MongoDb is connected"));

app.use("/", route);
let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("app running on port 3000");
});

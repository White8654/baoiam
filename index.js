const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

// app.use("view engine", "ejs");

// app.set("views", __dirname + "views");

// Use body-parser middleware to parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer().any());
// "mongodb+srv://poushali26:0U8on2StHP5FNKo2@cluster0.jwwwcc8.mongodb.net/baoiam"
mongoose
  .connect("mongodb://0.0.0.0:27017/baoiam")

  .then(() => console.log("MongoDb is connected"));
let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("app running on port 3000");
});

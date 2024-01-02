const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require("../controller/userController");
const mailController = require("../controller/mailController");

const middleWare = require("../middleware/auth");

router.get("/", (req, res) => {
  // res.json("hiii");
  res.render("index");
});

router.get("/dashboard", (req, res) => {
  const parentDirectory = path.join(__dirname, "..");
  res.sendFile("index.html");
});

//===============================userapi============================================//

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get(
  "/user/:userId/profile",
  middleWare.authentication,
  middleWare.authorization,
  userController.getuserprofile
);

//==============================otp generator======================================//

router.post("/getOTP", userController.getOTP);
router.post("/booksession", userController.booksession);

//==============================mail==========================================//

router.post("/mail", mailController.mailSender);

router.all("/*", (req, res) => {
  res.status(400).send({ status: false, message: "Endpoint is not correct" });
});

//============================dashboard=============================//

module.exports = router;

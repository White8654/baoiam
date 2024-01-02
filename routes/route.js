const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const mailController = require("../controller/mailController");

const middleWare = require("../middleware/auth");

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
router.get("/", (req, res) => {
  res.sendFile("index.js");
});

//==============================mail==========================================//

router.post("/mail", mailController.mailSender);

router.all("/*", (req, res) => {
  res.status(400).send({ status: false, message: "Endpoint is not correct" });
});

module.exports = router;

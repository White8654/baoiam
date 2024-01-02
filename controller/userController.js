const UserModel = require("../models/userModel");
const Appointment = require("../models/AppointmentModel");

const valid = require("../Validator/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    // extract data and file from RequestBody
    const data = JSON.parse(JSON.stringify(req.body));

    let { username, email, password } = data;
    //const phone = Math.floor(Math.random() * 9000000000) + 1000000000;
    // checking if user does not enters any data
    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "No data provided" });
    }

    // checking files are coming or not
    //         let files= req.files
    //         if(files && files.length>0){
    //             let validImage=files[0].mimetype.split('/')
    //             if(validImage[0]!="image"){
    //            return res.status(400).send({ status: false, message: "Please Provide Valid Image.." })}

    //       let uploadedFileURL= await uploadFile(files[0])

    //       profileImage=uploadedFileURL
    //   }
    //   else{
    //       return res.status(400).send({ msg: "No file found" })
    //   }

    // checking for fname
    // if (!valid.isValid(fname)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "please enter first name" });
    // }

    // checking for lname
    if (!valid.isValid(username)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter name" });
    }

    // checking for email
    if (!valid.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter email" });
    }
    if (!valid.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid Email" });
    }

    const duplicateEmail = await UserModel.findOne({ email: email });
    if (duplicateEmail) {
      return res
        .status(400)
        .send({ status: false, message: "Email is already exist" });
    }

    // // checking for phone
    // if (!valid.isValid(phone)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "please enter phone no." });
    // }

    // if (!valid.isValidMobile(phone)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "please enter valid phone" });
    // }

    // const duplicatePhone = await UserModel.findOne({ phone: phone });
    // if (duplicatePhone) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "phone is already exist" });
    // }

    // checking for password
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "please enter password" });

    if (!valid.isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be of minimum 8 characters & maximum 15 characters",
      });
    }
    // using bcrypt
    const rounds = 10;
    let hash = await bcrypt.hash(password, rounds);
    data.password = hash;

    const data1 = {
      username: username,
      email: email,
      password: hash,
    };

    let result = await UserModel.create(data1);
    res.status(201).send({
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//====================================login=========================================================//

const loginUser = async function (req, res) {
  try {
    let requestBody = req.body;

    //Extract Params
    let { email, password } = requestBody;
    if (Object.keys(requestBody) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide email and password" });
    }
    if (!email) {
      return res.status(400).send({ status: false, msg: "Enter your  email" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter your  password" });
    }

    if (!valid.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message:
          "Invalid request body. Please provide the the input to proceed",
      });
    }

    //Validation start
    if (!valid.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter an email address." });
    }

    if (!valid.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter Password." });
    }

    let user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ status: false, message: "Login failed! Email  is incorrect." });

    let passwordBody = user.password;
    let encryptPassword = await bcrypt.compare(password, passwordBody);

    if (!encryptPassword)
      return res.status(400).send({
        status: false,
        message: "Login failed! password is incorrect.",
      });
    //Validation End

    let userId = user._id;
    // create token
    let token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "project-5-Products_Management_61",
      { expiresIn: "12h" }
    );

    res
      .status(200)
      .send({ status: true, message: "Success", userId: { userId, token } });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server not responding", error: err.message });
  }
};

//================================getuserprofile=================================================//
const getuserprofile = async function (req, res) {
  try {
    let userId = req.params.userId;
    if (!userId) {
      return res.status(400).send({ status: false, msg: "Provide user Id" });
    }

    //if userId is given then is it valid or not

    if (userId) {
      if (!valid.isValidObjectId(userId))
        return res
          .status(400)
          .send({ status: false, msg: "Not a valid userId" });
    }
    // finding user in DB
    const getdata = await UserModel.findById(userId);
    if (!getdata) {
      return res.status(404).send({ status: false, message: "No User found" });
    }
    return res.status(200).send({ status: true, data: getdata });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

function generateOTP() {
  // Define the length of the OTP
  const otpLength = 4;

  // Generate a random 6-digit OTP
  const otp = Math.floor(Math.random() * Math.pow(10, otpLength));

  // Pad the OTP with leading zeros if necessary
  const formattedOTP = otp.toString().padStart(otpLength, "0");

  return formattedOTP;
}
// In-memory store for phone numbers and OTPs
const otpStore = {};

const getOTP = async function (req, res) {
  try {
    var phoneNumber = req.body.phoneNumber;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }
    var otp = generateOTP();
    otpStore[phoneNumber] = otp;

    //send otp via sms

    return res.status(200).send({ status: true, otp: otp });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const booksession = async function (req, res) {
  try {
    const { phoneNumber, enteredOTP, enteredDate } = req.body;

    if (!enteredDate || !enteredOTP) {
      return res
        .status(400)
        .json({ error: "Phone number and OTP are required" });
    }

    const storedOTP = otpStore[phoneNumber];

    if (!storedOTP || enteredOTP !== storedOTP) {
      return res.status(401).json({ err: "Invalid OTP" });
    }

    // Clear the OTP after successful verification
    delete otpStore[phoneNumber];

    const appointeduser = new Appointment({
      phoneNumber: phoneNumber,
      date: enteredDate,
    });

    await appointeduser.save();

    return res.json({
      success: true,
      message: "OTP verified successfully, Appointment booked",
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = { createUser, loginUser, getuserprofile, getOTP, booksession };

const mongoose = require("mongoose");

const isValidName = function (value) {
  if (
    typeof value === "string" &&
    value.trim().length > 0 &&
    /[a-zA-Z\D ]*$/.test(value)
  )
    return true;
  return false;
};
const isValidT = function (value) {
  //title
  if (
    typeof value === "string" &&
    value.trim().length > 0 &&
    /[a-zA-Z0-9 ]*$/.test(value)
  )
    return true;
  return false;
};

const isValid = function (value) {
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

const isValidMobile = function (value) {
  if (typeof value === "string" && /^[0-9]\d{9}$/gi.test(value)) return true;
  return false;
};

const isValidEmail = function (value) {
  if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) && value.trim().length > 0)
    return true;
  return false;
};

// const isValidPassword = function (value) {
//   if ( typeof value === "string" && value.trim().length > 0 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(value)) return true;
//   return false;
// };
const isValidPassword = function (pw) {
  return (
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length > 8 &&
    pw.length < 15
  );
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = {
  isValid,
  isValidT,
  isValidRequestBody,
  isValidObjectId,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidMobile,
};

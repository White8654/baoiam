const signupusername = $("#signupusername");
const signuppassword = $("#signuppassword");
const signupemail = $("#signupemail");
const loginusername = $("#loginusername");
const loginpassword = $("#loginpassword");

function signupUser() {
  console.log("signup user");
  const data = {
    username: signupusername.val(),
    email: signupemail.val(),
    password: signuppassword.val(),
  };
  console.log(data);
}

function loginUser() {
  console.log("login user");
  const data = {
    email: loginusername.val(),
    password: loginpassword.val(),
  };
  console.log(data);
}

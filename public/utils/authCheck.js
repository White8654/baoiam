const login = $("#logincheck");

function getToken() {
  var token = localStorage.getItem("token");
  if (token) {
    return "Bearer " + token;
  }
}

function checkAuthorization() {
  // Checks if the user is logged in by looking at the token stored in Local Storage
  console.log("checking auth");
  const authToken = getToken();
  console.log(authToken);
  if (!authToken) {
    // window.location.replace("/login");
  } else {
    login.html(`<div style="padding:0" class="profileicon" href="./Baioam-Dashboard/index.html">
    <i class="fa-solid fa-user"></i>
  </div>`);
  }
}

checkAuthorization();

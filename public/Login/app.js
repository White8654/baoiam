const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function loginUser() {
  const username = document.getElementById("loginusername").value;
  const password = document.getElementById("loginpassword").value;

  const apiUrl = "http://localhost:3000/login/";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        // alert("User authentication failed");
        throw new Error("User authentication failed");
      }
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("User", JSON.stringify(data));
      // Redirect to the dashboard
      window.location.href = "/dashboard";
      // window.location.href =
      //   "http://localhost:3000/baoiam/public/Baioam-Dashboard/index.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error("Error:", error);
      // Handle errors here
    });
}

function signupUser() {
  const email = document.getElementById("signupemail").value;
  const username = document.getElementById("signupusername").value;
  const password = document.getElementById("signuppassword").value;

  //const words = username.split(" ");
  const apiUrl = "http://localhost:3000/register/";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(`User authentication failed: ${data.message}`);
        });
      }
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("User", JSON.stringify(data));
      // Redirect to the dashboard
      window.location.href = "/dashboard";
      // window.location.href =
      //   "http://localhost:3000/public/Baioam-Dashboard/index.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error("Error:", error);
      // Handle errors here
    });
}

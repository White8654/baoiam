// adding cross icon onclick in navbar
const navBartoggler = document.querySelector(".navbar-toggler");
const navIcon = document.querySelector(".navbar-toggler-icon");

navBartoggler.addEventListener("click", function () {
  // if(navIcon.classList.contains("navbar-toggler-icon")){
  //     navIcon.s("class","")

  // }
  // else{
  //     navIcon.setAttribute("class","navbar-toggler-icon")
  // }
  navIcon.classList.toggle("navbar-toggler-icon");
  navIcon.classList.toggle("fa-solid");
  navIcon.classList.toggle("fa-xmark");
});
// code end

//==============================fetch api=========================//

let message = $("#message");
let courseSelection = $("#courseSelection");
let phone = $("#phno");
let emailbox = $("#emailbox");
let namebox = $("#namebox");

const sendmail = async () => {
  const data = {
    name: namebox.val(),
    email: emailbox.val(),
    number: phone.val(),
    select: courseSelection.val(),
    msg: message.val(),
  };
  //   console.log(data);
  const response = await fetch("http://localhost:3000/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
      // Add any additional headers if needed
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.clone().json();
  //   console.log(responseData);
  if (responseData && !responseData.err) {
    alert("Message Sent Successfully!");
  } else {
    alert(responseData.err);
  }
};

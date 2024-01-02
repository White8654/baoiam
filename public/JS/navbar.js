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

// Adding and removing blocks when hover on links
const navCourses = document.querySelector("#nav-courses-two");
const navCoursesList = document.querySelector(".nav-courses-list");
// const navCoursesAll = document.querySelector('.nav-courses-all')

function AddHoveringDisplayEffectOnLinks(parent, child, display) {
  parent.addEventListener("mouseenter", (child) => {
    child.style.display = display;
  });

  parent.addEventListener("mouseleave", (child) => {
    child.style.display = "none";
  });
}

AddHoveringDisplayEffectOnLinks(navCourses, navCoursesList, "block");

document.querySelectorAll(".nav-courses-list>li").forEach((listItem) => {
  listItem.addEventListener("mouseenter", () => {
    if (
      !listItem.getAttribute("selected") ||
      listItem.getAttribute("selected") === "false"
    ) {
      listItem.setAttribute("selected", "true");
      const navCoursesListLink = document.querySelector(
        ".nav-courses-list>li[selected='true'] a"
      );
      navCoursesListLink.style.backgroundColor = "rgba(241, 214, 164, 0.603)";
      navCoursesListLink.style.setProperty("color", "orangered", "important");
      const bar = document.querySelector(
        ".nav-courses-list>li[selected='true'] .bar"
      );
      bar.style.backgroundColor = "orangered";
      console.log(bar);
      document.querySelector(
        ".nav-courses-list>li[selected='true'] .sub-courses-list"
      ).style.display = "flex";
    }
  });

  listItem.addEventListener("mouseleave", () => {
    if (listItem.getAttribute("selected") === "true") {
      document.querySelector(
        ".nav-courses-list>li[selected='true'] .sub-courses-list"
      ).style.display = "none";
      const navCoursesListLink = document.querySelector(
        ".nav-courses-list>li[selected='true'] a"
      );
      navCoursesListLink.style.backgroundColor = "transparent";
      navCoursesListLink.style.setProperty("color", "#040052", "important");
      document.querySelector(
        ".nav-courses-list>li[selected='true'] .bar"
      ).style.backgroundColor = "transparent";
      listItem.setAttribute("selected", "false");
    }
  });
});

// Adding subdropdown of courses dropdown
const navbarCoursesDropdownMenu = document.querySelector(
  "#navbarDropdown-subcourses"
);
const navbarDropdown = document.querySelector("#nav-courses-one");

navbarDropdown.onclick = () => {
  const navbarCoursesDropdownMenu = document.querySelector(
    "#nav-courses-one .dropdown-menu"
  );

  if (navbarCoursesDropdownMenu.style.display !== "block") {
    navbarCoursesDropdownMenu.style.display = "block";
  } else {
    navbarCoursesDropdownMenu.style.display = "none";
  }
};

navbarCoursesDropdownMenu.onclick = () => {
  const navbarCoursesDropdownMenu = document.querySelector(
    "#nav-courses-one .dropdown-menu"
  );

  if (navbarCoursesDropdownMenu.style.display !== "block")
    navbarCoursesDropdownMenu.style.display = "block";
};

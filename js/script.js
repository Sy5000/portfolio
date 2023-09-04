//////////////////////////////////////////////////
// #toolkit scroll buttons //

const target = document.getElementById("tech-logos");

function leftScroll() {
  target.scrollBy(-250, 0);
}
function rightScroll() {
  target.scrollBy(250, 0);
}
//////////////////////////////////////////////////
// services links > auto scroll + active class toggle

// pointers //
const serviceList = document.querySelectorAll(".services__link");
const services1 = document.getElementById("services--1");
const services2 = document.getElementById("services--2");
const services3 = document.getElementById("services--3");
const services4 = document.getElementById("services--4");

const toggleServicesOff = function (serviceList) {
  serviceList.forEach((el) => {
    el.classList.remove("active");
  });
};

// link event listener //
document
  .querySelector(".services-list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("services__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });

      // toggle 'active' class on li as sections scroll > Intersection Observer API
    }
  });

//////////////////////////////////////////////////
// IntersectionObserver API

let animateServicesList = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry);

    if (entry.isIntersecting && entry.target.id === "services--1") {
      toggleServicesOff(serviceList);
      serviceList[0].classList.add("active");
    }
    if (entry.isIntersecting && entry.target.id === "services--2") {
      toggleServicesOff(serviceList);
      serviceList[1].classList.add("active");
    }
    if (entry.isIntersecting && entry.target.id === "services--3") {
      toggleServicesOff(serviceList);
      serviceList[2].classList.add("active");
    }
    if (entry.isIntersecting && entry.target.id === "services--4") {
      toggleServicesOff(serviceList);
    }
  });
};

let servicesOptions = {
  root: null, // defaults to browser viewport
  rootMargin: "-50%",
  threshold: [0], // 0 = 1pixel visibility
};

const servicesObserver = new IntersectionObserver(
  animateServicesList,
  servicesOptions
);

servicesObserver.observe(services1);
servicesObserver.observe(services2);
servicesObserver.observe(services3);
servicesObserver.observe(services4);

//////////////////////////////////////////////////
// #projects section

// responsive ✅
// hard code mobile first (column, img over blurb) ✅
// check device size ✅
// add a hide class to mobile layout blurbs ✅
// display the 1st project blurb ✅
// observe images and programatically switch for correct blurb when scrolled I/O of view ✅
//  >using innerhtml (trigger animations) ✅

// mobile first ALL blurbs
const projectCopyMobPos = document.querySelectorAll(".project-summary");
// desktop placeholder
let projectCopyDeskPos = document.getElementById("dynamic-content");

// hide mobile first layout (col  (img / desription))
// reposition (row (descriptions, img))
if (window.innerWidth > 600) {
  projectCopyDeskPos.innerHTML = projectCopyMobPos[0].innerHTML;

  projectCopyMobPos.forEach((projectCopy) => projectCopy.classList.add("hide"));
}

////////////////////////////////////////////////////////
// Intersection Observer API - Desktop Layout

const projImg1 = document.getElementById("proj-img-01");
const projImg2 = document.getElementById("proj-img-02");
const projImg3 = document.getElementById("proj-img-03");

let loadProjectCopy = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      // logic blocks multiple DOM updates of same content
      // DOM updates only when new project section intersects
      if (
        entry.target.dataset.project === "0" &&
        projectCopyDeskPos.innerHTML != projectCopyMobPos[0].innerHTML
      ) {
        projectCopyDeskPos.innerHTML = projectCopyMobPos[0].innerHTML;
      }

      if (
        entry.target.dataset.project === "1" &&
        projectCopyDeskPos.innerHTML != projectCopyMobPos[1].innerHTML
      ) {
        projectCopyDeskPos.innerHTML = projectCopyMobPos[1].innerHTML;
      }

      if (
        entry.target.dataset.project === "2" &&
        projectCopyDeskPos.innerHTML != projectCopyMobPos[2].innerHTML
      ) {
        projectCopyDeskPos.innerHTML = projectCopyMobPos[2].innerHTML;
      }
    }
  });
};

let projectsOptions = {
  root: null,
  rootMargin: "-50%",
  threshold: [0],
};

const projectsObserver = new IntersectionObserver(
  loadProjectCopy,
  projectsOptions
);

projectsObserver.observe(projImg1);
projectsObserver.observe(projImg2);
projectsObserver.observe(projImg3);

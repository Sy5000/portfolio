///////////////////////////////////////////////////
// #toolkit scroll buttons
const target = document.getElementById("tech-logos");

function leftScroll() {
  target.scrollBy(-100, 0);
}
function rightScroll() {
  target.scrollBy(100, 0);
}
/////////////////////////////////////////////////////////////////
// Pointers
const listItems = document.querySelectorAll(".services-list>li");

/////////////////////////////////////////////////
// Return scroll direction

let oldYoffset = 0; //init value
let scrollDown = true; //true = 🔻 //false = 🔺

window.addEventListener("scroll", function (e) {
  let newYoffset = window.pageYOffset; // new value ea scroll event

  // compare values to determine scroll direction
  if (oldYoffset - newYoffset < 0) {
    scrollDown = true;
  } else if (oldYoffset - newYoffset > 0) {
    scrollDown = false;
  }
  oldYoffset = newYoffset; // update the value
});

////////////////////////////////////////////////////
// #services toggle titles

const iterateForward = function (scrollDown) {
  if (scrollDown === true) {
    for (let i = 0; i < listItems.length - 1; i++) {
      if (listItems[i].classList.contains("active")) {
        listItems[i].classList.remove("active");
        listItems[i + 1].classList.add("active");
        break;
      }
    }
  }
};
const iterateBack = function (scrollDown) {
  if (scrollDown !== true) {
    for (let i = 1; i < listItems.length; i++) {
      if (listItems[i].classList.contains("active")) {
        listItems[i].classList.remove("active");
        listItems[i - 1].classList.add("active");
      }
    }
  }
};

////////////////////////////////////////////////////
// #services intersectionObserver API
// observe headers and rotate to correct title

const servicesListHeader2 = document.getElementById("servicesHeader2");
const servicesListHeader3 = document.getElementById("servicesHeader3");
const servicesListHeader4 = document.getElementById("servicesHeader4");

let animateServicesList = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry);
    // console.log(entry.boundingClientRect.top, "<- top");
    if (entry.boundingClientRect.top > 0 && entry.boundingClientRect.top < 50) {
      // console.log("trigger");
      iterateBack(scrollDown);
      iterateForward(scrollDown);
    }
  });
};

let servicesOptions = {
  root: null, // defaults to browser viewport
  rootMargin: "-25px", // 1/2way point of trigger area //+25px scroll buffer for ea scroll dir 🔺+🔻
  threshold: [0.99], //0 = 1pixel visibility
};

const servicesObserver = new IntersectionObserver(
  animateServicesList,
  servicesOptions
);

servicesObserver.observe(servicesListHeader2);
servicesObserver.observe(servicesListHeader3);
servicesObserver.observe(servicesListHeader4);

////////// END
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
////////// #'projects' section

//responsive
// hard code mobile first (column, img over blurb) ✅
// check device size ✅
// add a hide class to mobile layout blurbs ✅
// display the 1st project blurb ✅
// observe images and programatically switch for correct blurb when scrolled I/O of view ✅
//  >using innerhtml (hopeflly this triggers animations)

const projectCopyMobPos = document.querySelectorAll(".project-summary");
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
// console.log(projImg1, projImg2, projImg3);

let loadProjectCopy = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      //SWITCH???

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

// projectsObserver.observe(projImg1);
projectsObserver.observe(projImg1);
projectsObserver.observe(projImg2);
projectsObserver.observe(projImg3);

const myFunction = function () {
  console.log("function triggered");
};

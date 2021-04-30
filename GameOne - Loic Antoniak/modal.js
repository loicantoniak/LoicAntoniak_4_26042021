"use strict";

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const myTopnav = document.getElementById("myTopnav")

/*========================*/
/*      RESPONSIVE NAV    */
/*========================*/

function editNav() {
  if (myTopnav.className === "topnav") {
    myTopnav.className += " responsive";
  } else {
    myTopnav.className = "topnav";
  }
}

/*========================*/
/*      LAUNCH MODAL      */
/*========================*/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/*========================*/
/*      CLOSE MODAL       */
/*========================*/

// close modal form
const closeModal = () => {
  modalbg.style.display = "none";
};

// close modal event
closeBtn.addEventListener("click", closeModal);

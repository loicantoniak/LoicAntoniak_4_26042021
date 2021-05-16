"use strict";

// DOM Elements
// Modal
const modalbg = document.querySelector(".bground");
const modalbgSubmit = document.querySelector(".bground--submit");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const closeSubmitBtn = document.querySelectorAll(".close--submitModal");
const myTopnav = document.getElementById("myTopnav");

// Form
const submitBtn = document.querySelector('input[type= "submit"]');
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("#registrationForm");

// Responsive nav : add classname on topNav
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

/*========================*/
/*   CLOSE SUBMIT MODAL   */
/*========================*/

// close modal form
const closeSubmitModal = () => {
  modalbgSubmit.style.display = "none";
};

// close submit modal
closeSubmitBtn.forEach((btn) =>
  btn.addEventListener("click", closeSubmitModal)
);

/*========================*/
/*      FORM VALIDATION   */
/*========================*/

const error = {
  firstName: {
    empty: "Veuillez renseigner votre prénom",
    notValide: "Ce champ doit comporter au minimum 2 caractères et être valide",
  },
  lastName: {
    empty: "Veuillez renseigner votre nom",
    notValide: "Ce champ doit comporter au minimum 2 caractères et être valide",
  },
  email: {
    empty: "Veuillez renseigner votre email",
    notValide: "Votre email n'est pas valide",
  },
  birthdate: {
    empty: "Veuillez renseigner votre date de naissance",
    notValide: "Veuillez saisir une date valide",
  },
  quantity: {
    empty: "Veuillez renseigner le nombre d'anciennes participations",
    notValide: "Ce champ doit contenir un nombre compris entre 0 et 99",
  },
  location: {
    empty: "Veuillez saisir une ville",
  },
  checkbox: {
    empty: "Veuillez cocher les conditions d'utilisation",
  },
};

const showDataError = (input, condition, error) => {
  if (condition) {
    input.parentElement.setAttribute("data-error", error);
  } else {
    input.parentElement.removeAttribute("data-error");
  }
};

// Check if input is empty
const checkInputIsEmpty = (input, error) => {
  const value = input.value;
  showDataError(input, value === "", error);
};

// Check if input is valid
const validInput = (input, error) => {
  // Create RegExp for diff validation
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  const textRegExp = new RegExp(/^(?=.{2,50}$)[A-zÀ-ú]+(?:['-][A-zÀ-ú]+)*$/);
  const numberRegExp = new RegExp("^([0-9]{1,2}){1}$", "g");
  const dateRegExp = new RegExp(
    /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
  );
  // Test Input
  let regExpInput;
  const type = input.type;
  const name = input.name;

  if (type === "email") regExpInput = emailRegExp;
  if (type === "text") regExpInput = textRegExp;
  if (name === "quantity") regExpInput = numberRegExp;
  if (name === "birthdate") regExpInput = dateRegExp;

  const testInput = regExpInput.test(input.value);

  showDataError(input, !testInput, error);
};

// Check if radio button is checked
const checkIfOneRadioButtonIsSelected = (error) => {
  const firstLocationInput = document.getElementById("location1");
  // Select all radio buttons and convert on array
  const locations = [...form.querySelectorAll('input[name= "location"]')];
  const checkedButton = (button) => button.checked === true;
  // True if one element are checked
  const oneChecked = locations.some(checkedButton);
  showDataError(firstLocationInput, !oneChecked, error);
};

const validate = () => {
  const inputs = form.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    const name = inputs[i].name;
    const notEmpty = inputs[i].value !== "";

    // Check if radio button is checked
    if (name === "location") {
      checkIfOneRadioButtonIsSelected(error[name].empty);
    } else if (inputs[i].type === "submit") return;
    // Check if general conditions are checked
    else if (name === "checkbox") {
      const generalCondition = document.querySelector("#checkbox1");
      showDataError(
        generalCondition,
        !generalCondition.checked,
        error[name].empty
      );
    }
    // If input is not empty, check if input is valid
    // check if input is empty
    else {
      checkInputIsEmpty(inputs[i], error[name].empty);
      notEmpty && validInput(inputs[i], error[name].notValide);
    }
  }
};

let isValid = false;

// Check if form is valid before submitting
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  validate();
  const allFormData = [...formData];
  const dataError = (formdata) => formdata.getAttribute("data-error");
  // True if an error exist
  const checkIfOneErrorExist = allFormData.some(dataError);

  if (!checkIfOneErrorExist) {
    modalbg.style.display = "none";
    modalbgSubmit.style.display = "block";
    form.reset();
  }
});

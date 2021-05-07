"use strict";

//Le formulaire doit être valide quand l'utilisateur clique sur "Submit"

/* Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.") */

// DOM Elements
// Modal
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
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
/*      FORM VALIDATION   */
/*========================*/

const error = {
  firstName: {
    empty: "Veuillez renseigner votre prénom",
    notValide: "Ce champ doit comporter au minimum 2 caractères",
  },
  lastName: {
    empty: "Veuillez renseigner votre nom",
    notValide: "Ce champ doit comporter au minimum 2 caractères",
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

const showDataError = (input, condition, error, e) => {
  if (condition) {
    e.preventDefault();
    input.parentElement.setAttribute("data-error", error);
  } else {
    input.parentElement.removeAttribute("data-error");
  }
};

// Check if input is empty
const checkInputIsEmpty = (input, error, e) => {
  const value = input.value;
  showDataError(input, value === "", error, e);
};

// Check if input is valid
const validInput = (input, error, e) => {
  // Create RegExp for diff validation
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  const textRegExp = new RegExp(/^.{2,}$/);
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

  showDataError(input, !testInput, error, e);
};

// Check if radio button is checked
const checkIfOneRadioButtonIsSelected = (error, e) => {
  const firstLocationInput = document.getElementById("location1");
  // Select all radio buttons and convert on array
  const locations = [...form.querySelectorAll('input[name= "location"]')];
  const checkedButton = (button) => button.checked === true;
  // True if one element are checked
  const oneChecked = locations.some(checkedButton);
  showDataError(firstLocationInput, !oneChecked, error, e);
};

// Check if form is valid before submitting
submitBtn.addEventListener("click", function (e) {
  const inputs = form.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    const name = inputs[i].name;
    const notEmpty = inputs[i].value !== "";

    // Check if radio button is checked
    if (name === "location") {
      checkIfOneRadioButtonIsSelected(error[name].empty, e);
    } else if (inputs[i].type === "submit") return;
    // Check if general conditions are checked
    else if (name === "checkbox") {
      const generalCondition = document.querySelector("#checkbox1");
      showDataError(
        generalCondition,
        !generalCondition.checked,
        error[name].empty,
        e
      );
    }
    // If input is not empty, check if input is valid
    // check if input is empty
    else {
      checkInputIsEmpty(inputs[i], error[name].empty, e);
      notEmpty && validInput(inputs[i], error[name].notValide, e);
    }
  }
});

/* -- General & DOM Selectors -- */
const nameSearch = (new URL(window.location)).searchParams;
const getName = nameSearch.get('name');

// Modal selectors
const pageWrapper = document.getElementById('page-wrapper');
const contactModal = document.getElementById('contact-modal');
const modalName = document.getElementById('modal__name');
const modalBackground = document.getElementById('modal-background');
const modalInputs = document.querySelectorAll('form > input');
const contactButton = document.querySelector('.contact-button');
const closeButton = document.getElementById('close-modal');
const submitButton = document.getElementById('submit-button');
const closeValidationMsg = document.getElementById('validation__close');
const confirmButton = document.getElementById('validation__confirm-button');
const modalPadding = document.getElementById('modal-padding');

// Specific inputs selectors
// Adding specific invalid messages to be shown when relevant
const firstName = document.getElementById('first-name');
const firstNameInvalid = document.getElementById('first-name-invalid_message');
const lastName = document.getElementById('last-name');
const lastNameInvalid = document.getElementById('last-name-invalid_message');
const email = document.getElementById('email');
const emailInvalid = document.getElementById('email-invalid_message');

// Validation message selectors
const validationModal = document.getElementById('validation__dialog');
const validationMessage = document.getElementById('validation__message');

/* -- Contact modal -- */

// Adding photographer name dynamically
modalName.innerText = getName;
contactModal.setAttribute('aria-label', `Contact me ${getName}`);

// Opening the modal
contactButton.addEventListener('click', () => {
  contactModal.classList.remove('hidden');
  contactModal.classList.add('opened__contact-modal');
  modalBackground.classList.remove('hidden');
  pageWrapper.setAttribute('aria-disabled', 'true');

  // 'Required' has to be added dynamically to prevent errors when required inputs are hidden
  modalInputs.forEach((input) => {
    input.toggleAttribute('required');
  });
});

// Trapping focus inside the modal for accessibility
const modalFocusableElements = 'form > input, button, textarea';
const firstFocusableElement = contactModal.querySelectorAll(modalFocusableElements)[0];
const focusableContent = contactModal.querySelectorAll(modalFocusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];

document.addEventListener('keydown', (event) => {
  const tabIsPressed = event.key === 'Tab' || event.key === 9;
  if (!tabIsPressed) {
    return false;
  }
  // In case of Shift, if the active element is the first, loop back and vice-versa
  if (event.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      event.preventDefault();
    }
  // If pressed key is Tab
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
    }
  }
});

/* -- INPUTS REGEX VALIDATION -- */

// First Name
firstName.addEventListener('input', () => {
  // Both first and last name have similar requirements
  const regexFirstName = new RegExp(
    /^[a-zA-Z\-àâçéèêëîïôûùüÿñæœ']{2,}$/,
    'g', // Test all occurences
  );
  const testFirstName = regexFirstName.test(firstName.value);

  if (testFirstName) {
    firstNameInvalid.classList.add('hidden');
  } else {
    firstNameInvalid.classList.remove('hidden');
  }
});

// Last Name
lastName.addEventListener('input', () => {
  const regexLastName = new RegExp(
    /^[a-zA-Z\-àâçéèêëîïôûùüÿñæœ']{2,}$/,
    'g',
  );
  const testLastName = regexLastName.test(lastName.value);

  if (testLastName) {
    lastNameInvalid.classList.add('hidden');
  } else {
    lastNameInvalid.classList.remove('hidden');
  }
});

// Email
email.addEventListener('input', () => {
  const regexEmail = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
    'g',
  );
  const testEmail = regexEmail.test(email.value);

  if (testEmail) {
    emailInvalid.classList.add('hidden');
  } else {
    emailInvalid.classList.remove('hidden');
  }
});

// Checking all inputs at once (for submit button)
function checkAllInputs() {
  if (!firstName.checkValidity()) {
    firstNameInvalid.classList.remove('hidden');
  } else {
    firstNameInvalid.classList.add('hidden');
  }
  if (!lastName.checkValidity()) {
    lastNameInvalid.classList.remove('hidden');
  } else {
    lastNameInvalid.classList.add('hidden');
  }
  if (!email.checkValidity()) {
    emailInvalid.classList.remove('hidden');
  } else {
    emailInvalid.classList.add('hidden');
  }
}

// Removing 'required' attribute to avoid errors and closing the modal
function closeAndSubmit() {
  modalInputs.forEach((input) => {
    input.toggleAttribute('required');
  });
  contactModal.classList.add('hidden');
  contactModal.classList.remove('opened__contact-modal');
}

// Displaying validation message
function validationEvent() {
  // Centering the message
  modalPadding.style.height = '100%';
  validationMessage.innerText = `Merci d'avoir pris contact avec ${getName}`;
  validationModal.classList.remove('hidden');
  validationModal.animate(
    [{ opacity: '0', transform: 'translateY(-999px)' },

      { opacity: '1' },
    ], 1000,
  );
}

// Both 'dialog' and 'form' close buttons behave identically
closeButton.addEventListener('click', (event) => {
  event.preventDefault();
  modalInputs.forEach((input) => {
    input.toggleAttribute('required');
  });
  contactModal.classList.remove('opened__contact-modal');
  contactModal.classList.add('hidden');
  modalBackground.classList.add('hidden');
  pageWrapper.removeAttribute('aria-disabled', 'true');
});

[closeValidationMsg, confirmButton].forEach((button) => {
  button.addEventListener('click', () => {
    modalPadding.style.height = 'auto';
    validationModal.classList.add('hidden');
    modalBackground.classList.add('hidden');
    pageWrapper.removeAttribute('aria-disabled', 'true');
  });
});

// Submitting event
// If the form is valid, submit it, else, highlight invalid inputs
submitButton.addEventListener('click', (e) => {
  // If form is valid, log user input
  e.preventDefault();
  if (contactModal.checkValidity()) {
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);

    // Submission animation
    contactModal.animate(
      [{ opacity: '1' },

        { opacity: '.2', transform: 'translateY(-999px)' },
      ], 1000,
    );
    // Clearing the modal after submission
    contactModal.reset();
    // Returning to top of modal
    setTimeout(closeButton.focus(), 1000);
    // Removing form from view
    setTimeout(closeAndSubmit, 1000);
    // Validation message
    setTimeout(validationEvent, 1000);
  } else {
    // Checking every input at once
    checkAllInputs();
  }
});

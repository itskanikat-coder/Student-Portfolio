// Dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Form + elements
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl = document.getElementById("formStatus");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function clearErrors() {
  [nameInput, emailInput, messageInput].forEach((input) =>
    input.classList.remove("error")
  );
  [nameError, emailError, messageError].forEach((el) => (el.textContent = ""));
  statusEl.textContent = "";
}

// validate on submit, but ALLOW normal submit when valid
form.addEventListener("submit", function (e) {
  clearErrors();

  let hasError = false;

  if (!nameInput.value.trim()) {
    hasError = true;
    nameInput.classList.add("error");
    nameError.textContent = "Please enter your name.";
  }

  if (!emailInput.value.trim()) {
    hasError = true;
    emailInput.classList.add("error");
    emailError.textContent = "Please enter your email.";
  } else if (!validateEmail(emailInput.value.trim())) {
    hasError = true;
    emailInput.classList.add("error");
    emailError.textContent = "Please enter a valid email address.";
  }

  if (!messageInput.value.trim()) {
    hasError = true;
    messageInput.classList.add("error");
    messageError.textContent = "Please enter your message.";
  }

  if (hasError) {
    // stop the submit ONLY if there are errors
    e.preventDefault();
    statusEl.textContent = "Please fix the errors above and try again.";
  } else {
    // no preventDefault here → browser sends POST to Web3Forms
    statusEl.textContent = "Sending your message...";
    submitBtn.disabled = true;
  }
});
const feedbackForm = document.querySelector(".feedback-form");
const fullNameInput = document.getElementById("full-name");
const fullNameError = document.getElementById("full-name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const topicSelect = document.getElementById("topic");
const topicError = document.getElementById("topic-error");
const commentsInput = document.getElementById("comments");
const commentsError = document.getElementById("comments-error");
const commentsCount = document.getElementById("comments-count");
const websiteInput = document.getElementById("website");
const websiteError = document.getElementById("website-error");
const feedbackStatus = document.getElementById("feedback-status");
const minimumCommentLength = 15;
const maximumCommentLength = 500;
let feedbackStatusTimeout;

function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("data-validated", "true");
}

function clearFieldError(input, errorElement) {
  errorElement.textContent = "";
  errorElement.hidden = true;
  input.removeAttribute("aria-invalid");
  input.removeAttribute("data-validated");
}

function markFieldValid(input) {
  input.setAttribute("aria-invalid", "false");
  input.setAttribute("data-validated", "true");
}

function validateFullName() {
  if (!fullNameInput.value.trim()) {
    showFieldError(fullNameInput, fullNameError, "Please enter your full name.");
    return false;
  }

  clearFieldError(fullNameInput, fullNameError);
  markFieldValid(fullNameInput);
  return true;
}

function validateEmail() {
  if (!emailInput.value.trim()) {
    showFieldError(emailInput, emailError, "Please enter your email address.");
    return false;
  }
  if (!emailInput.validity.valid) {
    showFieldError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }

  clearFieldError(emailInput, emailError);
  markFieldValid(emailInput);
  return true;
}

function validateTopic() {
  if (!topicSelect.value) {
    showFieldError(topicSelect, topicError, "Please select a topic.");
    return false;
  }

  clearFieldError(topicSelect, topicError);
  markFieldValid(topicSelect);
  return true;
}

function validateComments() {
  const characterCount = commentsInput.value.trim().length;

  if (characterCount < minimumCommentLength) {
    showFieldError(
      commentsInput,
      commentsError,
      `Please enter at least ${minimumCommentLength} characters.`
    );
    return false;
  }

  clearFieldError(commentsInput, commentsError);
  markFieldValid(commentsInput);
  return true;
}

function updateCommentCount(comments = commentsInput.value) {
  const characterCount = comments.length;
  const isTooShort = comments.trim().length < minimumCommentLength;

  commentsCount.textContent = `${characterCount}/${maximumCommentLength}`;
  commentsCount.setAttribute(
    "aria-label",
    `${characterCount} of ${maximumCommentLength} characters; minimum ${minimumCommentLength} characters`
  );
  commentsCount.classList.toggle("is-too-short", isTooShort);
  commentsCount.classList.toggle("is-valid", !isTooShort);
}

function validateWebsite() {
  if (websiteInput.value.trim() && !websiteInput.validity.valid) {
    showFieldError(websiteInput, websiteError, "Please enter a valid website URL.");
    return false;
  }

  clearFieldError(websiteInput, websiteError);
  if (websiteInput.value.trim()) {
    markFieldValid(websiteInput);
  } else {
    websiteInput.setAttribute("data-validated", "true");
  }
  return true;
}

function validateForm() {
  const fieldResults = [
    [fullNameInput, validateFullName()],
    [emailInput, validateEmail()],
    [topicSelect, validateTopic()],
    [commentsInput, validateComments()],
    [websiteInput, validateWebsite()],
  ];
  const firstInvalidField = fieldResults.find(([, isValid]) => !isValid);

  if (firstInvalidField) firstInvalidField[0].focus();
  return !firstInvalidField;
}

function validateWhenErrorIsVisible(input, validator) {
  const updateError = () => {
    if (input.hasAttribute("data-validated")) validator();
  };

  input.addEventListener("input", updateError);
  input.addEventListener("change", updateError);
}

function resetForm() {
  window.clearTimeout(feedbackStatusTimeout);
  feedbackStatus.textContent = "";
  feedbackStatus.hidden = true;
  clearFieldError(fullNameInput, fullNameError);
  clearFieldError(emailInput, emailError);
  clearFieldError(topicSelect, topicError);
  clearFieldError(commentsInput, commentsError);
  clearFieldError(websiteInput, websiteError);
  updateCommentCount("");
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!validateForm()) return;

  const fullName = fullNameInput.value.trim();
  feedbackForm.reset();
  feedbackStatus.textContent = `Thanks for your feedback, ${fullName}!`;
  feedbackStatus.hidden = false;
  feedbackStatusTimeout = window.setTimeout(() => {
    feedbackStatus.textContent = "";
    feedbackStatus.hidden = true;
  }, 4000);
}

validateWhenErrorIsVisible(fullNameInput, validateFullName);
validateWhenErrorIsVisible(emailInput, validateEmail);
validateWhenErrorIsVisible(topicSelect, validateTopic);
validateWhenErrorIsVisible(websiteInput, validateWebsite);
commentsInput.addEventListener("input", () => {
  updateCommentCount();
  if (commentsInput.hasAttribute("data-validated")) validateComments();
});
feedbackForm.addEventListener("reset", resetForm);
feedbackForm.addEventListener("submit", handleFormSubmit);

updateCommentCount();

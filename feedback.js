const feedbackForm = document.querySelector(".feedback-form");
const fullNameInput = document.getElementById("full-name");
const fullNameError = document.getElementById("full-name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const topicSelect = document.getElementById("topic");
const topicError = document.getElementById("topic-error");
const commentsInput = document.getElementById("comments");
const commentsError = document.getElementById("comments-error");
const websiteInput = document.getElementById("website");
const websiteError = document.getElementById("website-error");
const sendFeedbackButton = document.getElementById("send-feedback");
const clearFeedbackButton = document.getElementById("clear-feedback");

function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
  input.setAttribute("aria-invalid", "true");
}

function clearFieldError(input, errorElement) {
  errorElement.textContent = "";
  errorElement.hidden = true;
  input.removeAttribute("aria-invalid");
}

function validateFullName() {
  if (!fullNameInput.value.trim()) {
    showFieldError(fullNameInput, fullNameError, "Please enter your full name.");
    return false;
  }

  clearFieldError(fullNameInput, fullNameError);
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
  return true;
}

function validateTopic() {
  if (!topicSelect.value) {
    showFieldError(topicSelect, topicError, "Please select a topic.");
    return false;
  }

  clearFieldError(topicSelect, topicError);
  return true;
}

function validateComments() {
  if (!commentsInput.value.trim()) {
    showFieldError(commentsInput, commentsError, "Please enter your comments.");
    return false;
  }

  clearFieldError(commentsInput, commentsError);
  return true;
}

function validateWebsite() {
  if (websiteInput.value.trim() && !websiteInput.validity.valid) {
    showFieldError(websiteInput, websiteError, "Please enter a valid website URL.");
    return false;
  }

  clearFieldError(websiteInput, websiteError);
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
}

function validateWhenErrorIsVisible(input, errorElement, validator) {
  const updateError = () => {
    if (!errorElement.hidden) validator();
  };

  input.addEventListener("input", updateError);
  input.addEventListener("change", updateError);
}

function resetForm() {
  clearFieldError(fullNameInput, fullNameError);
  clearFieldError(emailInput, emailError);
  clearFieldError(topicSelect, topicError);
  clearFieldError(commentsInput, commentsError);
  clearFieldError(websiteInput, websiteError);
}

sendFeedbackButton.addEventListener("click", validateForm);
validateWhenErrorIsVisible(fullNameInput, fullNameError, validateFullName);
validateWhenErrorIsVisible(emailInput, emailError, validateEmail);
validateWhenErrorIsVisible(topicSelect, topicError, validateTopic);
validateWhenErrorIsVisible(commentsInput, commentsError, validateComments);
validateWhenErrorIsVisible(websiteInput, websiteError, validateWebsite);
feedbackForm.addEventListener("reset", resetForm);

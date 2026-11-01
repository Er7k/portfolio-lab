const feedbackForm = document.querySelector(".feedback-form");
const fullNameInput = document.getElementById("full-name");
const fullNameError = document.getElementById("full-name-error");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");
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

function resetForm() {
  clearFieldError(fullNameInput, fullNameError);
}

sendFeedbackButton.addEventListener("click", validateFullName);
fullNameInput.addEventListener("input", () => {
  if (fullNameError.hidden) return;
  validateFullName();
});
feedbackForm.addEventListener("reset", resetForm);

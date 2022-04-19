import { checkLength, formValidation } from "./functions.js";

const form = document.querySelector("form");
const messageSend = document.querySelector(".form-submit");
const userName = document.querySelector("#name");
const userNameError = document.querySelector("#name-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	formValidation(userName, userNameError);
	formValidation(subject, subjectError);
	formValidation(message, messageError);
	if (formValidation(userName, userNameError) && formValidation(subject, subjectError) && formValidation(message, messageError) === true) {
		messageSend.style.display = "block";
		window.scrollTo(0, 0);
		form.reset();
	}
});

function showErrorMessage(input, form, { errorClass, inputErrorClass, ...rest }) {
    const error = document.querySelector("#" + input.id + "-error");
    error.textContent = input.validationMessage;

    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);
}

function hideErrorMessage(input, form, { errorClass, inputErrorClass, ...rest }) {
    const error = document.querySelector("#" + input.id + "-error");
    error.textContent = "";

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
}

function checkInputValidity(input, form, rest) {
    if (input.validity.valid) {
        hideErrorMessage(input, form, rest);
    } else {
        showErrorMessage(input, form, rest);
    }
}

function toggleButtonState(inputs, button, { inactiveButtonClass, ...rest }) {
    const isValid = inputs.every((input) => input.validity.valid);

    if (isValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    }
}


function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...rest }) {
    const forms = [...document.querySelectorAll(formSelector)];

    forms.forEach((form) => {
        form.addEventListener('submit', ((evt) => {
            evt.preventDefault();
        }))

        const inputs = [...form.querySelectorAll(inputSelector)];
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                checkInputValidity(input, form, rest);
                toggleButtonState(inputs, button, rest);
            })
        })
    })
}

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__type-error",
    errorClass: "popup__error_visible"
});
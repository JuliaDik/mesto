const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// показать ошибку
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
  inputElement.classList.add(configValidation.inputErrorClass);
};
// скрыть ошибку
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(configValidation.errorClass);
  inputElement.classList.remove(configValidation.inputErrorClass);
};
// проверить на валидность конкретное поле ввода
const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};
// проверить на валидность все поля ввода (необходимо для кнопки)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// переключить состояние кнопки
const toggleButtonState = (inputList, buttonElement, configValidation) => {
  // если хотя бы одно из полей ввода пустое или невалидно, сделать кнопку неактивной
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configValidation.inactiveButtonClass);
    // кнопка неактивна
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
    // кнопка активна
    buttonElement.removeAttribute('disabled');
  }
};
// установить слушатели на все поля ввода (проверка на валидность и реагирование кнопки)
const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  // до ввода данных кнопка неактивна
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
};
// активировать валидацию форм
const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, configValidation);
  });
};

enableValidation(configValidation);



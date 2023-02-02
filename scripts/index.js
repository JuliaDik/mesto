let nameProfile = document.querySelector('.profile__name');
let occupationProfile = document.querySelector('.profile__occupation');
let editionButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('.popup__input_type_name');
let occupationInput = document.querySelector('.popup__input_type_occupation');
let closureButton = document.querySelector('.popup__close-button');

// Открытие попапа
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  occupationInput.value = occupationProfile.textContent;
}

// Закрытие попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Сохранение и отправка формы
function handleFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = occupationInput.value;
    closePopup();
}

editionButton.addEventListener('click', openPopup);
closureButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

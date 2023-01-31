// Открытие и закрытие попапа
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');

// Открытие попапа
function popupOpened() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', popupOpened);

// Закрытие попапа
function popupClosed() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', popupClosed);

// Редактирование профиля (имени и информации о себе)
let formElement = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_occupation');

function handleFormSubmit (evt) {
    evt.preventDefault();
    let nameProfile = document.querySelector('.profile__name');
    let jobProfile = document.querySelector('.profile__occupation');
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

let saveButton = document.querySelector('.popup__save-button');
saveButton.addEventListener('click', popupClosed);

formElement.addEventListener('submit', handleFormSubmit);

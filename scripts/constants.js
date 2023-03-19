export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const configValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// кнопки
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

// попапы
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupCard = document.querySelector('.popup_type_image');
export const popupCardImage = document.querySelector('.popup__image');
export const popupCardCaption = document.querySelector('.popup__caption');
export const openedPopup = document.querySelector('.popup_opened');

// профиль
export const profileName = document.querySelector('.profile__name');
export const profileOccupation = document.querySelector('.profile__occupation');

// контейнер для карточек
export const cardsContainer = document.querySelector('.cards-container');

// форма "Редактировать профиль"
export const profileForm = document.forms['profile-form'];
export const inputName = document.querySelector('.popup__input_type_name');
export const inputOccupation = document.querySelector('.popup__input_type_occupation');

// форма "Новое место"
export const cardForm = document.forms['card-form'];
export const inputTitle = document.querySelector('.popup__input_type_title');
export const inputLink = document.querySelector('.popup__input_type_link');

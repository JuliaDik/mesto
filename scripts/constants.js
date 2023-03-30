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

// попапы
export const popupEditProfileSelector = '.popup_type_edit';
export const popupAddCardSelector = '.popup_type_add';
export const popupCardImageSelector = '.popup_type_image';

// кнопки
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

// форма "Редактировать профиль"
export const formProfile = document.forms['profile-form'];
export const inputName = document.querySelector('.popup__input_type_name');
export const inputOccupation = document.querySelector('.popup__input_type_occupation');

// профиль
export const profileName = document.querySelector('.profile__name');
export const profileOccupation = document.querySelector('.profile__occupation');

// форма "Новое место"
export const formCard = document.forms['card-form'];

// template и контейнер для карточек
export const cardTemplate = '.card-template';
export const cardsContainer = '.cards-container';

export const configValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// ЭЛЕМЕНТЫ

// кнопки
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

// аватар
export const avatarEdit = document.querySelector('.profile__avatar-edit');

// формы
export const formProfile = document.forms['profile-form'];
export const formCard = document.forms['card-form'];
export const formAvatar = document.forms['avatar-form'];

// СЕЛЕКТОРЫ

// попапы
export const popupFormProfileSelector = '.popup_type_edit';
export const popupFormAvatarSelector = '.popup_type_avatar';
export const popupFormConfirmationSelector = '.popup_type_delete';
export const popupFormCardSelector = '.popup_type_add';
export const popupCardImageSelector = '.popup_type_image';

// профиль
export const userNameSelector = '.profile__name';
export const userAboutSelector = '.profile__about';
export const userAvatarSelector = '.profile__avatar-image';

// template карточки
export const cardTemplateSelector = '.card-template';

// контейнер для карточек
export const cardsContainerSelector = '.cards-container';

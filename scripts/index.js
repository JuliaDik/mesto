import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  initialCards,
  configValidation,
  buttonEdit,
  buttonAdd,
  popups,
  popupEdit,
  popupAdd,
  popupCard,
  popupCardImage,
  popupCardCaption,
  openedPopup,
  profileName,
  profileOccupation,
  cardsContainer,
  profileForm,
  inputName,
  inputOccupation,
  cardForm,
  inputTitle,
  inputLink
} from './constants.js';

// валидатор формы "Редактировать профиль" (объект)
const profileFormValidator = new FormValidator(configValidation, profileForm);

// валидатор формы "Новое место" (объект)
const cardFormValidator = new FormValidator(configValidation, cardForm);

//открыть попап
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
};

// закрыть попап
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
};

// закрыть попап кликом на оверлей или крестик
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

// обработчик нажатия Escape
const handleEsc = evt => {
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};

// обработчик клика по картинке карточки
const handleImageCardClick = (name, link) => {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;
  openPopup(popupCard);
};

// создать карточку
const generateCard = (data) => {
  const card = new Card(data, '.card-template', handleImageCardClick);
  return card.generateCard();
};

// добавить карточки из массива
initialCards.forEach(data => {
  cardsContainer.append(generateCard(data));
});

// обработчик открытия формы "Редактировать профиль"
const handleProfileFormOpen = () => {
  openPopup(popupEdit);
  profileFormValidator.enableValidation();
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
};

// обработчик submit формы "Редактировать профиль"
const handleProfileFormSubmit = () => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
};

// обработчик открытия формы "Новое место"
const handleCardFormOpen = () => {
  openPopup(popupAdd);
  cardFormValidator.enableValidation();
};

// обработчик submit формы "Новое место"
const handleCardFormSubmit = evt => {
  const data = {
    name: inputTitle.value,
    link: inputLink.value
  }
  cardsContainer.prepend(generateCard(data));
  evt.target.reset();
  cardFormValidator.enableValidation();
  closePopup(popupAdd);
};

// СЛУШАТЕЛИ

// открыть форму "Редактировать профиль"
buttonEdit.addEventListener('click', handleProfileFormOpen);

// сохранить (закрыть) форму "Редактировать профиль"
profileForm.addEventListener('submit', handleProfileFormSubmit);

// открыть форму "Новое место"
buttonAdd.addEventListener('click', handleCardFormOpen);

// сохранить (закрыть) форму "Новое место"
cardForm.addEventListener('submit', handleCardFormSubmit);

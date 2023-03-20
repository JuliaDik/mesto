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
  profileName,
  profileOccupation,
  cardsContainer,
  formProfile,
  inputName,
  inputOccupation,
  formCard,
  inputTitle,
  inputLink
} from './constants.js';

// валидатор формы "Редактировать профиль"
const formProfileValidator = new FormValidator(configValidation, formProfile);
formProfileValidator.enableValidation();

// валидатор формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formCard);
formCardValidator.enableValidation();

//открыть попап
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEscape);
};

// закрыть попап
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEscape);
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
const handleCloseByEscape = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
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
const handleFormProfileOpen = () => {
  formProfileValidator.resetValidation();
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
  openPopup(popupEdit);
};

// обработчик submit формы "Редактировать профиль"
const handleFormProfileSubmit = () => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
};

// обработчик открытия формы "Новое место"
const handleFormCardOpen = () => {
  formCardValidator.resetValidation();
  openPopup(popupAdd);
};

// обработчик submit формы "Новое место"
const handleFormCardSubmit = evt => {
  const data = {
    name: inputTitle.value,
    link: inputLink.value
  }
  cardsContainer.prepend(generateCard(data));
  evt.target.reset();
  closePopup(popupAdd);
};

// СЛУШАТЕЛИ

// открыть форму "Редактировать профиль"
buttonEdit.addEventListener('click', handleFormProfileOpen);

// сохранить (закрыть) форму "Редактировать профиль"
formProfile.addEventListener('submit', handleFormProfileSubmit);

// открыть форму "Новое место"
buttonAdd.addEventListener('click', handleFormCardOpen);

// сохранить (закрыть) форму "Новое место"
formCard.addEventListener('submit', handleFormCardSubmit);

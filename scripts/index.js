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
  cards,
  profileForm,
  inputName,
  inputOccupation,
  cardForm,
  inputTitle,
  inputLink
} from './constants.js';

// валидатор формы "Редактировать профиль"
const profileFormValidator = new FormValidator(configValidation, profileForm);
profileFormValidator.enableValidation();

// валидатор формы "Новое место"
const cardFormValidator = new FormValidator(configValidation, cardForm);
cardFormValidator.enableValidation();

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

// обработчик Escape
const handleEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// обработчик клика по карточке
const handleCardClick = (name, link) => {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;
  openPopup(popupCard);
}

// создать карточку
const generateCard = (data) => {
  const card = new Card(data, '.card-template', handleCardClick);
  const generatedCard = card.generateCard();
  return generatedCard;
}

// добавить карточку
const renderCard = (data) => {
  const cardElement = generateCard(data);
  cards.prepend(cardElement);
}

// добавить карточки из массива
initialCards.forEach(card => {
  renderCard(card);
});

// обработчик формы "Редактировать профиль"
const handleFormEditSubmit = () => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
};

// обработчик формы "Новое место"
const handleFormAddSubmit = evt => {
  const card = {
    name: inputTitle.value,
    link: inputLink.value
  };
  renderCard(card);
  evt.target.reset();
  cardFormValidator.enableValidation();
  closePopup(popupAdd);
};

// открыть форму "Редактировать профиль"
buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

// сохранить форму "Редактировать профиль"
profileForm.addEventListener('submit', handleFormEditSubmit);

// открыть форму "Новое место"
buttonAdd.addEventListener('click', () => openPopup(popupAdd));

// сохранить форму "Новое место"
cardForm.addEventListener('submit', handleFormAddSubmit);

// закрыть попап кликом на оверлей или крестик
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

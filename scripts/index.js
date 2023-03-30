import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  configValidation,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupCardImageSelector,
  buttonEdit,
  buttonAdd,
  formProfile,
  inputName,
  inputOccupation,
  profileName,
  profileOccupation,
  formCard,
  cardTemplate,
  cardsContainer
} from './constants.js';

// валидация формы "Редактировать профиль"
const formProfileValidator = new FormValidator(configValidation, formProfile);

formProfileValidator.enableValidation();

// валидация формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formCard);

formCardValidator.enableValidation();

// обработчик редактирования профиля
const handleEditProfile = () => {
  formProfileValidator.resetValidation();
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
  popupEditProfile.open();
};

// обработчик submit профиля
const handleSubmitProfile = () => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupEditProfile.close();
};

// обработчик добавления карточки
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupAddCard.open();
};

// обработчик submit карточки
const handleSubmitCard = (data) => {
  renderCard(data);
  popupAddCard.close();
};

// обработчик клика по картинке карточки (открыть)
const handleCardClick = (cardImage) => {
  popupCardImage.open(cardImage);
};

// отрисовать отдельную карточку
const renderCard = (data) => {
  const card = new Card(data, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
};

// отрисовать все карточки
const cardsList = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsContainer);

cardsList.renderItems();

// слушатель клика по кнопке редактировать профиль (открыть)
buttonEdit.addEventListener('click', handleEditProfile);

// слушатель клика по кнопке добавить карточку (открыть)
buttonAdd.addEventListener('click', handleAddCard);

// слушатель submit профиля
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleSubmitProfile);

popupEditProfile.setEventListeners();

// слушатель submit карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitCard);

popupAddCard.setEventListeners();

// слушатель закрытия картинки карточки
const popupCardImage = new PopupWithImage(popupCardImageSelector);

popupCardImage.setEventListeners();
